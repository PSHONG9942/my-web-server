// ============================================================================
// SJK(C) Pei Ching 3D Print Hub - Google Apps Script Backend
// 支持：标准订单分表记录、Orders_DB 全局订单总表、MakerWorld 远程报价、
//       现场看摊确认收款、师生实时文字连线 (Live_Chat)、Telegram Bot 即时推送
// ============================================================================

const DEFAULT_TELEGRAM_BOT_TOKEN = '';
const DEFAULT_TELEGRAM_CHAT_ID = '';
const DEFAULT_ADMIN_PIN = '8888';

const TIMEZONE = 'Asia/Kuala_Lumpur';

function authorizeTelegramPermission() {
  // 在 Apps Script 编辑器顶部下拉框选择此函数并点击「运行」，即可触发并授权外部网络请求权限
  var res = UrlFetchApp.fetch('https://api.telegram.org', { muteHttpExceptions: true });
  Logger.log('UrlFetchApp authorized! HTTP status: ' + res.getResponseCode());
}

function getConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    botToken: props.getProperty('TELEGRAM_BOT_TOKEN') || DEFAULT_TELEGRAM_BOT_TOKEN,
    chatId: props.getProperty('TELEGRAM_CHAT_ID') || DEFAULT_TELEGRAM_CHAT_ID,
    adminPin: props.getProperty('ADMIN_PIN') || DEFAULT_ADMIN_PIN
  };
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function formatNow_(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date();
  return Utilities.formatDate(d, TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}

function getOrCreateSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendTelegramNotification_(message, overrideToken, overrideChatId) {
  const cfg = getConfig_();
  const token = (overrideToken !== undefined && overrideToken !== '') ? overrideToken : cfg.botToken;
  const chatId = (overrideChatId !== undefined && overrideChatId !== '') ? overrideChatId : cfg.chatId;

  if (!token || !chatId) {
    return { ok: false, reason: 'Telegram Bot Token or Chat ID not configured' };
  }

  try {
    const url = 'https://api.telegram.org/bot' + encodeURIComponent(token.trim()) + '/sendMessage';
    const res = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        chat_id: String(chatId).trim(),
        text: message,
        disable_web_page_preview: false
      }),
      muteHttpExceptions: true
    });
    const code = res.getResponseCode();
    const body = res.getContentText();
    if (code >= 200 && code < 300) {
      return { ok: true };
    }
    return { ok: false, reason: 'HTTP ' + code + ': ' + body };
  } catch (err) {
    return { ok: false, reason: err.toString() };
  }
}

function sheetRowsToObjects_(sheet, limit, reverseOrder) {
  if (!sheet) return [];
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow <= 1 || lastCol === 0) return [];

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const dataRowCount = lastRow - 1;
  const startRow = limit && dataRowCount > limit ? lastRow - limit + 1 : 2;
  const numRows = lastRow - startRow + 1;
  const values = sheet.getRange(startRow, 1, numRows, lastCol).getValues();

  const items = values.map(function (row) {
    const obj = {};
    for (var i = 0; i < headers.length; i++) {
      var key = String(headers[i]).trim();
      var val = row[i];
      if (val instanceof Date) {
        val = Utilities.formatDate(val, TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
      }
      obj[key] = val;
    }
    return obj;
  });

  if (reverseOrder) {
    items.reverse();
  }
  return items;
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'get_state';

    if (action === 'get_state') {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const ordersSheet = ss.getSheetByName('Orders_DB');
      const chatSheet = ss.getSheetByName('Live_Chat');
      const cfg = getConfig_();

      const orders = sheetRowsToObjects_(ordersSheet, 100, true);
      const chats = sheetRowsToObjects_(chatSheet, 80, false);

      return jsonResponse({
        status: 'success',
        server_time: formatNow_(),
        telegram_configured: Boolean(cfg.botToken && cfg.chatId),
        tg_bot_token: cfg.botToken || '',
        tg_chat_id: cfg.chatId || '',
        orders: orders,
        chats: chats
      });
    }

    return jsonResponse({ status: 'error', message: 'Unknown GET action: ' + action });
  } catch (error) {
    return jsonResponse({ status: 'error', message: error.toString() });
  }
}

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    const data = JSON.parse(raw);
    const action = data.action || 'create_order';
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const cfg = getConfig_();

    if (action === 'create_order') {
      return handleCreateOrder_(ss, data);
    }
    if (action === 'update_quote') {
      if (cfg.adminPin && String(data.pin || '') !== String(cfg.adminPin)) {
        return jsonResponse({ status: 'error', message: 'Invalid Admin PIN' });
      }
      return handleUpdateQuote_(ss, data);
    }
    if (action === 'booth_confirm_order') {
      return handleBoothConfirmOrder_(ss, data);
    }
    if (action === 'send_chat') {
      if (data.sender === 'teacher' && cfg.adminPin && String(data.pin || '') !== String(cfg.adminPin)) {
        return jsonResponse({ status: 'error', message: 'Invalid Admin PIN' });
      }
      return handleSendChat_(ss, data);
    }
    if (action === 'verify_pin') {
      const valid = String(data.pin || '') === String(cfg.adminPin);
      return jsonResponse({
        status: valid ? 'success' : 'error',
        valid: valid,
        telegram_configured: Boolean(cfg.botToken && cfg.chatId)
      });
    }
    if (action === 'save_config') {
      if (cfg.adminPin && String(data.pin || '') !== String(cfg.adminPin)) {
        return jsonResponse({ status: 'error', message: 'Invalid Current Admin PIN' });
      }
      const props = PropertiesService.getScriptProperties();
      if (data.bot_token !== undefined) {
        props.setProperty('TELEGRAM_BOT_TOKEN', String(data.bot_token).trim());
      }
      if (data.chat_id !== undefined) {
        props.setProperty('TELEGRAM_CHAT_ID', String(data.chat_id).trim());
      }
      if (data.new_pin !== undefined && String(data.new_pin).trim() !== '') {
        props.setProperty('ADMIN_PIN', String(data.new_pin).trim());
      }
      return jsonResponse({ status: 'success', message: 'Settings saved to Google Apps Script Properties.' });
    }
    if (action === 'test_telegram') {
      if (cfg.adminPin && String(data.pin || '') !== String(cfg.adminPin)) {
        return jsonResponse({ status: 'error', message: 'Invalid Admin PIN' });
      }
      const msg = '✅ Pei Ching 3D Print Hub 测试通知成功！\n时间: ' + formatNow_() + '\n义卖会远程报价与现场呼叫系统已连接就绪。';
      const result = sendTelegramNotification_(msg, data.bot_token, data.chat_id);
      if (result.ok) {
        return jsonResponse({ status: 'success', message: 'Telegram test message sent!' });
      }
      return jsonResponse({ status: 'error', message: 'Telegram failed: ' + result.reason });
    }

    return jsonResponse({ status: 'error', message: 'Unknown POST action: ' + action });
  } catch (error) {
    return jsonResponse({ status: 'error', message: error.toString() });
  }
}

function resolveBunnyDetails_(data) {
  const themeMap = {
    'Red': { theme: 'Strawberry', main: 'Red', sec: 'White', ter: 'Pink' },
    'Green': { theme: 'Mint', main: 'Green', sec: 'White', ter: 'Pink' },
    'Yellow': { theme: 'Lemon', main: 'Yellow', sec: 'White', ter: 'Pink' },
    'Purple': { theme: 'Grape', main: 'Purple', sec: 'White', ter: 'Pink' },
    'Pink': { theme: 'Peach', main: 'Pink', sec: 'White', ter: 'White' },
    'White': { theme: 'Vanilla', main: 'White', sec: 'White', ter: 'Pink' }
  };
  const info = themeMap[data.filament_color] || {
    theme: data.bunny_theme || 'Custom',
    main: data.filament_color || '',
    sec: data.secondary_color || 'White',
    ter: data.tertiary_color || 'Pink'
  };
  if (data.bunny_theme) info.theme = data.bunny_theme;
  return info;
}

function handleCreateOrder_(ss, data) {
  const modelChoice = data.model_choice || 'Keychain';
  const orderId = data.order_id || ('3D-' + Math.floor(1000 + Math.random() * 9000));
  const formattedDate = formatNow_(data.date);
  const studentName = data.student_name || '';
  const studentClass = data.student_class || '';
  const quantity = Number(data.quantity) || 1;
  const isMakerWorld = modelChoice === 'MakerWorld';
  const status = data.status || (isMakerWorld ? 'Pending Quote' : 'Pending');
  const totalPrice = isMakerWorld ? 'Pending Quote' : String(data.total_price || '0.00');

  // 1. 写入按模型分类的工作表（保留向后兼容列顺序）
  const tabNameMap = {
    'Keychain': 'Keychains',
    'Tumbler': 'Tumblers',
    'Topper': 'Pencil Toppers',
    'Flexi_Cat': 'Flexi Cats',
    'Flexi_Bunny': 'Flexi Bunnies',
    'MakerWorld': 'MakerWorld Custom'
  };
  const tabName = tabNameMap[modelChoice] || 'Other Orders';

  const baseHeaders = ['Date', 'Status', 'Student Name', 'Class', 'Quantity', 'Total Price'];
  let headers = [];
  let rowData = [];
  let summary = '';

  if (modelChoice === 'Keychain') {
    headers = baseHeaders.concat(['Text', 'Main Color', 'Text Color', 'Font Style', 'Width (mm)', 'Add Ring', 'Order ID']);
    rowData = [
      formattedDate, status, studentName, studentClass, quantity, totalPrice,
      data.keychain_text || '', data.filament_color || '', data.keychain_name_color || '',
      data.font_style || '', data.keychain_width || '', data.add_keychain_ring ? 'Yes' : 'No',
      orderId
    ];
    summary = '名字: ' + (data.keychain_text || '') + ' | ' + (data.keychain_width || '') + 'mm | 底:' + (data.filament_color || '') + ' 字:' + (data.keychain_name_color || '') + ' | 字体:' + (data.font_style || '') + ' | 铁环:' + (data.add_keychain_ring ? '有' : '无');
  } else if (modelChoice === 'Tumbler') {
    headers = baseHeaders.concat(['Main Color', 'Secondary Color', 'Add Ring', 'Order ID']);
    rowData = [
      formattedDate, status, studentName, studentClass, quantity, totalPrice,
      data.filament_color || '', data.secondary_color || '', data.add_keychain_ring ? 'Yes' : 'No',
      orderId
    ];
    summary = '杯身:' + (data.filament_color || '') + ' | 盖/吸管:' + (data.secondary_color || 'None') + ' | 铁环:' + (data.add_keychain_ring ? '有' : '无');
  } else if (modelChoice === 'Topper') {
    headers = baseHeaders.concat(['Text', 'Emoji', 'Main Color', 'Text Color', 'Font Style', 'Order ID']);
    rowData = [
      formattedDate, status, studentName, studentClass, quantity, totalPrice,
      data.keychain_text || '', data.topper_emoji || '', data.filament_color || '',
      data.keychain_name_color || '', data.font_style || '',
      orderId
    ];
    summary = '名字: ' + (data.keychain_text || '') + ' | 表情:' + (data.topper_emoji || 'None') + ' | 底:' + (data.filament_color || '') + ' 字:' + (data.keychain_name_color || '') + ' | 字体:' + (data.font_style || '');
  } else if (modelChoice === 'Flexi_Cat') {
    headers = baseHeaders.concat(['Main Color', 'Secondary Color', 'Tertiary Color', 'Hole Position', 'Add Ring', 'Order ID']);
    rowData = [
      formattedDate, status, studentName, studentClass, quantity, totalPrice,
      data.filament_color || '', data.secondary_color || '', data.tertiary_color || '',
      data.cat_keychain_hole || 'None', data.add_keychain_ring ? 'Yes' : 'No',
      orderId
    ];
    summary = '主色:' + (data.filament_color || '') + ' | 副色:' + (data.secondary_color || '') + ' | 条纹:' + (data.tertiary_color || '') + ' | 孔位:' + (data.cat_keychain_hole || 'None') + ' | 铁环:' + (data.add_keychain_ring ? '送' : '无');
  } else if (modelChoice === 'Flexi_Bunny') {
    const bunny = resolveBunnyDetails_(data);
    headers = baseHeaders.concat(['Main Color (skin)', 'Secondary Color (belly)', 'Tertiary Color (Details)', 'Hole Position', 'Add Ring', 'Theme', 'Order ID']);
    rowData = [
      formattedDate, status, studentName, studentClass, quantity, totalPrice,
      bunny.main, bunny.sec, bunny.ter,
      data.cat_keychain_hole || 'None', data.add_keychain_ring ? 'Yes' : 'No',
      bunny.theme, orderId
    ];
    summary = '主题:' + bunny.theme + ' (' + bunny.main + '/' + bunny.sec + '/' + bunny.ter + ') | 孔位:' + (data.cat_keychain_hole || 'None') + ' | 铁环:' + (data.add_keychain_ring ? '送' : '无');
  } else if (modelChoice === 'MakerWorld') {
    headers = ['Order ID', 'Date', 'Status', 'Student Name', 'Class', 'Quantity', 'Quote Price', 'MakerWorld URL / Name', 'Color Mode', 'Preferred Colors', 'Student Notes', 'Teacher Note'];
    rowData = [
      orderId, formattedDate, status, studentName, studentClass, quantity,
      totalPrice, data.mw_url || '', data.mw_color_mode || '1_Color',
      data.mw_colors || '', data.mw_notes || '', ''
    ];
    summary = '模式:' + (data.mw_color_mode === 'AMS_4Color' ? 'AMS多色(≤4色)' : '单色打印') + ' | 颜色:' + (data.mw_colors || '');
  } else {
    headers = baseHeaders.concat(['Raw Data', 'Order ID']);
    rowData = [formattedDate, status, studentName, studentClass, quantity, totalPrice, JSON.stringify(data), orderId];
    summary = data.summary || modelChoice;
  }

  const categorySheet = getOrCreateSheet_(ss, tabName, headers);
  categorySheet.appendRow(rowData);

  // 2. 写入 Orders_DB 全局总表（供前端看板 & 老师后台实时读取更新）
  const dbHeaders = [
    'Order ID', 'Date', 'Status', 'Model Choice', 'Student Name', 'Class',
    'Quantity', 'Total Price', 'Summary', 'MakerWorld URL', 'Student Notes',
    'Teacher Note', 'Updated At'
  ];
  const dbSheet = getOrCreateSheet_(ss, 'Orders_DB', dbHeaders);
  dbSheet.appendRow([
    orderId,
    formattedDate,
    status,
    modelChoice,
    studentName,
    studentClass,
    quantity,
    totalPrice,
    data.summary || summary,
    data.mw_url || '',
    data.mw_notes || '',
    '',
    formattedDate
  ]);

  // 3. 发送 Telegram 通知给老师
  var tgResult = { ok: false };
  if (isMakerWorld) {
    const tgMsg =
      '🚨【义卖会新询价单】\n' +
      '单号: #' + orderId + '\n' +
      '学生: ' + studentName + ' (' + studentClass + ')\n' +
      '数量: ' + quantity + ' 件\n' +
      '模式: ' + (data.mw_color_mode === 'AMS_4Color' ? 'AMS 多色(≤4色)' : '单色打印') + '\n' +
      '期望颜色: ' + (data.mw_colors || '未指定') + '\n' +
      '模型链接/名称:\n' + (data.mw_url || '-') + '\n' +
      (data.mw_notes ? '备注: ' + data.mw_notes + '\n' : '') +
      '\n👉 请打开老师后台查看模型并回复报价！';
    tgResult = sendTelegramNotification_(tgMsg);
  } else {
    const tgMsg =
      '🆕【3D打印新订单】\n' +
      '单号: #' + orderId + '\n' +
      '学生: ' + studentName + ' (' + studentClass + ')\n' +
      '物品: ' + modelChoice + ' x' + quantity + '\n' +
      '金额: RM ' + totalPrice + '\n' +
      '详情: ' + (data.summary || summary);
    tgResult = sendTelegramNotification_(tgMsg);
  }

  return jsonResponse({
    status: 'success',
    message: 'Order added successfully!',
    order_id: orderId,
    telegram_sent: Boolean(tgResult && tgResult.ok)
  });
}

function updateRowByOrderId_(sheet, orderIdColIndex, orderId, updatesMap) {
  if (!sheet) return null;
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow <= 1 || lastCol === 0) return null;

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) {
    return String(h).trim();
  });
  const ids = sheet.getRange(2, orderIdColIndex, lastRow - 1, 1).getValues();

  for (var i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]).trim() === String(orderId).trim()) {
      var targetRow = i + 2;
      var rowValues = sheet.getRange(targetRow, 1, 1, lastCol).getValues()[0];
      var updatedRowObj = {};
      for (var c = 0; c < headers.length; c++) {
        var colName = headers[c];
        if (Object.prototype.hasOwnProperty.call(updatesMap, colName)) {
          rowValues[c] = updatesMap[colName];
        }
        updatedRowObj[colName] = rowValues[c];
      }
      sheet.getRange(targetRow, 1, 1, lastCol).setValues([rowValues]);
      return updatedRowObj;
    }
  }
  return null;
}

function handleUpdateQuote_(ss, data) {
  const orderId = String(data.order_id || '').trim();
  if (!orderId) {
    return jsonResponse({ status: 'error', message: 'Missing order_id' });
  }

  const nowStr = formatNow_();
  const newStatus = data.status || 'Quoted';
  const teacherNote = data.teacher_note !== undefined ? String(data.teacher_note) : '';

  const dbUpdates = {
    'Status': newStatus,
    'Teacher Note': teacherNote,
    'Updated At': nowStr
  };
  const mwUpdates = {
    'Status': newStatus,
    'Teacher Note': teacherNote
  };

  if (data.quote_price !== undefined && data.quote_price !== null && String(data.quote_price).trim() !== '') {
    var numPrice = parseFloat(data.quote_price);
    var priceStr = isNaN(numPrice) ? String(data.quote_price).trim() : numPrice.toFixed(2);
    dbUpdates['Total Price'] = priceStr;
    mwUpdates['Quote Price'] = priceStr;
  }

  const dbSheet = ss.getSheetByName('Orders_DB');
  const updated = updateRowByOrderId_(dbSheet, 1, orderId, dbUpdates);
  if (!updated) {
    return jsonResponse({ status: 'error', message: 'Order ID not found in Orders_DB: ' + orderId });
  }

  const mwSheet = ss.getSheetByName('MakerWorld Custom');
  updateRowByOrderId_(mwSheet, 1, orderId, mwUpdates);

  return jsonResponse({
    status: 'success',
    message: 'Order updated',
    order_id: orderId,
    updated_status: newStatus
  });
}

function handleBoothConfirmOrder_(ss, data) {
  const orderId = String(data.order_id || '').trim();
  const newStatus = String(data.new_status || '').trim();
  if (!orderId || (newStatus !== 'Paid' && newStatus !== 'Cancelled')) {
    return jsonResponse({ status: 'error', message: 'Invalid order_id or new_status' });
  }

  const nowStr = formatNow_();
  const dbSheet = ss.getSheetByName('Orders_DB');
  const updated = updateRowByOrderId_(dbSheet, 1, orderId, {
    'Status': newStatus,
    'Updated At': nowStr
  });
  if (!updated) {
    return jsonResponse({ status: 'error', message: 'Order ID not found: ' + orderId });
  }

  const mwSheet = ss.getSheetByName('MakerWorld Custom');
  updateRowByOrderId_(mwSheet, 1, orderId, { 'Status': newStatus });

  const studentName = updated['Student Name'] || '';
  const studentClass = updated['Class'] || '';
  const modelChoice = updated['Model Choice'] || '';
  const totalPrice = updated['Total Price'] || '';

  var tgResult = { ok: false };
  if (newStatus === 'Paid') {
    tgResult = sendTelegramNotification_(
      '💰【现场已收款确认】\n' +
      '单号: #' + orderId + '\n' +
      '学生: ' + studentName + ' (' + studentClass + ')\n' +
      '物品: ' + modelChoice + '\n' +
      '金额: RM ' + totalPrice + '\n' +
      '✅ 现场已收款，可以安排打印！'
    );
  } else {
    tgResult = sendTelegramNotification_(
      '❌【现场顾客已取消】\n' +
      '单号: #' + orderId + '\n' +
      '学生: ' + studentName + ' (' + studentClass + ')\n' +
      '物品: ' + modelChoice
    );
  }

  return jsonResponse({
    status: 'success',
    order_id: orderId,
    status_updated: newStatus,
    telegram_sent: Boolean(tgResult && tgResult.ok)
  });
}

function handleSendChat_(ss, data) {
  const sender = data.sender === 'teacher' ? 'teacher' : 'booth';
  const text = String(data.text || '').trim();
  const orderRef = String(data.order_ref || '').trim();

  if (!text) {
    return jsonResponse({ status: 'error', message: 'Empty message text' });
  }

  const msgId = data.msg_id || ('MSG-' + Date.now() + '-' + Math.floor(Math.random() * 1000));
  const nowStr = formatNow_();
  const chatSheet = getOrCreateSheet_(ss, 'Live_Chat', ['Msg ID', 'Date', 'Sender', 'Text', 'Order Ref']);
  chatSheet.appendRow([msgId, nowStr, sender, text, orderRef]);

  var tgSent = false;
  if (sender === 'booth') {
    var tgResult = sendTelegramNotification_(
      '💬【义卖会现场学生求助】\n' +
      '"' + text + '"' +
      (orderRef ? '\n关联单号: #' + orderRef : '') +
      '\n\n👉 请打开老师后台实时对话回复！'
    );
    tgSent = Boolean(tgResult && tgResult.ok);
  }

  return jsonResponse({
    status: 'success',
    msg_id: msgId,
    date: nowStr,
    telegram_sent: tgSent
  });
}
