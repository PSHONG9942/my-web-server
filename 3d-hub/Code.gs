function doPost(e) {
  try {
    // Parse the incoming JSON string from the text/plain request
    const data = JSON.parse(e.postData.contents);
    const modelChoice = data.model_choice;
    
    // Open the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Determine the tab name based on the model
    const tabNameMap = {
      'Keychain': 'Keychains',
      'Tumbler': 'Tumblers',
      'Topper': 'Pencil Toppers',
      'Flexi_Cat': 'Flexi Cats',
      'Flexi_Bunny': 'Flexi Bunnies'
    };
    
    const tabName = tabNameMap[modelChoice] || 'Other Orders';
    let sheet = ss.getSheetByName(tabName);
    
    // Base Headers that apply to all orders
    const baseHeaders = ['Date', 'Status', 'Student Name', 'Class', 'Quantity', 'Total Price'];
    
    // Model-specific Headers
    let specificHeaders = [];
    if (modelChoice === 'Keychain') {
      specificHeaders = ['Text', 'Main Color', 'Text Color', 'Font Style', 'Width (mm)', 'Add Ring'];
    } else if (modelChoice === 'Tumbler') {
      specificHeaders = ['Main Color', 'Secondary Color', 'Add Ring'];
    } else if (modelChoice === 'Topper') {
      specificHeaders = ['Text', 'Emoji', 'Main Color', 'Text Color', 'Font Style'];
    } else if (modelChoice === 'Flexi_Cat') {
      specificHeaders = ['Main Color', 'Secondary Color', 'Tertiary Color', 'Hole Position', 'Add Ring'];
    } else if (modelChoice === 'Flexi_Bunny') {
      specificHeaders = ['Main Color (skin)', 'Secondary Color (belly)', 'Tertiary Color (Details)', 'Hole Position', 'Add Ring'];
    }
    
    const headers = baseHeaders.concat(specificHeaders);
    
    // If the sheet does not exist, create it and insert headers
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    }
    
    // Prepare the row data
    const rowData = [];
    let orderDate = data.date ? new Date(data.date) : new Date();
    let formattedDate = Utilities.formatDate(orderDate, "Asia/Kuala_Lumpur", "yyyy-MM-dd HH:mm:ss");
    rowData.push(formattedDate);
    rowData.push(data.status || 'Pending');
    rowData.push(data.student_name || '');
    rowData.push(data.student_class || '');
    rowData.push(data.quantity || 1);
    rowData.push(data.total_price || '0.00');
    
    if (modelChoice === 'Keychain') {
      rowData.push(data.keychain_text || '');
      rowData.push(data.filament_color || '');
      rowData.push(data.keychain_name_color || '');
      rowData.push(data.font_style || '');
      rowData.push(data.keychain_width || '');
      rowData.push(data.add_keychain_ring ? 'Yes' : 'No');
    } else if (modelChoice === 'Tumbler') {
      rowData.push(data.filament_color || '');
      rowData.push(data.secondary_color || '');
      rowData.push(data.add_keychain_ring ? 'Yes' : 'No');
    } else if (modelChoice === 'Topper') {
      rowData.push(data.keychain_text || ''); // Using keychain_text for topper text too
      rowData.push(data.topper_emoji || '');
      rowData.push(data.filament_color || '');
      rowData.push(data.keychain_name_color || '');
      rowData.push(data.font_style || '');
    } else if (modelChoice === 'Flexi_Cat') {
      rowData.push(data.filament_color || '');
      rowData.push(data.secondary_color || '');
      rowData.push(data.tertiary_color || '');
      rowData.push(data.cat_keychain_hole || '');
      rowData.push(data.add_keychain_ring ? 'Yes' : 'No');
    } else if (modelChoice === 'Flexi_Bunny') {
      let mainC = '', secC = '', terC = '';
      let themeId = data.filament_color || '';
      
      if (themeId === 'Red') { mainC = 'Red'; secC = 'White'; terC = 'Pink'; }
      else if (themeId === 'Green') { mainC = 'Green'; secC = 'White'; terC = 'Pink'; }
      else if (themeId === 'Yellow') { mainC = 'Yellow'; secC = 'White'; terC = 'Pink'; }
      else if (themeId === 'Purple') { mainC = 'Purple'; secC = 'White'; terC = 'Pink'; }
      else if (themeId === 'Pink') { mainC = 'Pink'; secC = 'White'; terC = 'White'; }
      else if (themeId === 'White') { mainC = 'White'; secC = 'White'; terC = 'Pink'; }
      
      rowData.push(mainC);
      rowData.push(secC);
      rowData.push(terC);
      rowData.push(data.cat_keychain_hole || '');
      rowData.push(data.add_keychain_ring ? 'Yes' : 'No');
    }
    
    // Append the order to the sheet
    sheet.appendRow(rowData);
    
    // Return success response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({"status": "success", "message": "Order added successfully!"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
