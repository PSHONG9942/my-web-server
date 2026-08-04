/**
 * 核心逻辑：利用 mumuy/relationship 库进行自然语言亲戚关系推导
 */

// 将表单选中的关系类型转换为自然语言
function getRelationText(relationType, ageRelative, gender) {
    switch(relationType) {
        case 'father': return '爸爸';
        case 'mother': return '妈妈';
        case 'spouse': return gender === 'male' ? '丈夫' : '妻子';
        case 'child': return gender === 'male' ? '儿子' : '女儿';
        case 'brother': 
            return ageRelative === 'older' ? '哥哥' : '弟弟';
        case 'sister':
            return ageRelative === 'older' ? '姐姐' : '妹妹';
        default: return '';
    }
}

// 获取节点颜色
function getNodeColor(gender, isSelf = false) {
    if (isSelf) return '#ef4444'; // 红色 - 自己
    if (gender === 'male') return '#3b82f6'; // 蓝色 - 男性
    if (gender === 'female') return '#ec4899'; // 粉色 - 女性
    return '#94a3b8'; // 灰色 - 未知
}

/**
 * 计算新节点的称呼和描述路径
 * @param {string} baseDesc - 被点击节点的自然语言描述（如 "爸爸", "爸爸的哥哥"）
 * @param {string} relationType - 'father', 'mother', 'spouse', 'brother', 'sister', 'child'
 * @param {string} gender - 'male', 'female'
 * @param {string} ageRelative - 'older', 'younger'
 */
function calculateKinship(baseDesc, relationType, gender, ageRelative) {
    const relationText = getRelationText(relationType, ageRelative, gender);

    // 拼接新的描述字符串 (查询语句)
    let newDesc = '';
    if (baseDesc === '自己' || baseDesc === 'me') {
        newDesc = relationText;
    } else {
        newDesc = `${baseDesc}的${relationText}`;
    }

    let resultTitle = '未知亲戚';
    
    try {
        // 调用引入的开源库 mumuy/relationship
        if (typeof relationship !== 'undefined') {
            // sex: 1 代表当前视角的“自己”为男性。如果要做得更完善，可以让用户在欢迎页选自己的性别。
            // reverse: false 表示正向查询
            const results = relationship({ text: newDesc, sex: 1 });
            
            if (results && results.length > 0) {
                // 先进行区域习惯和口语化转换（例如把北方的书面语转换为南方的日常用语）
                const formattedResults = results.map(title => {
                    let t = title;
                    t = t.replace(/^小姑$/, '姑姑');
                    t = t.replace(/姑父/g, '姑丈');
                    t = t.replace(/^小姨$/, '阿姨');
                    t = t.replace(/^姨妈$/, '阿姨');
                    t = t.replace(/姨父/g, '姨丈');
                    // 统一“姑表”、“姨表”为“表”
                    t = t.replace(/姑表/g, '表');
                    t = t.replace(/姨表/g, '表');
                    t = t.replace(/^姨(哥|弟|姐|妹)$/, '表$1');
                    t = t.replace(/^姑(哥|弟|姐|妹)$/, '表$1');
                    return t;
                });
                
                // 转换后可能有重复（比如姑表哥和姨表哥都变成了表哥），进行去重
                const uniqueResults = [...new Set(formattedResults)];

                // 如果是添加孩子，并且返回了多个结果（如堂哥、堂弟），根据 ageRelative 智能过滤
                if (relationType === 'child' && uniqueResults.length > 1) {
                    const olderKeywords = ['哥', '姐', '长'];
                    const youngerKeywords = ['弟', '妹', '次'];
                    const keywords = ageRelative === 'older' ? olderKeywords : youngerKeywords;
                    
                    const match = uniqueResults.find(title => keywords.some(kw => title.includes(kw)));
                    resultTitle = match || uniqueResults[0]; // 如果没找到匹配的，默认取第一个
                } else {
                    // 通常第一个是最常用、最标准的称呼
                    resultTitle = uniqueResults[0];
                }
            } else {
                // 如果库里查不到极度偏门的关系，就直接显示路径 (如：叔叔的舅舅的妻子)
                resultTitle = newDesc; 
            }
        }
    } catch (e) {
        console.error("亲戚称呼计算失败", e);
        resultTitle = newDesc;
    }

    return {
        title: resultTitle,
        desc: newDesc // 返回给 app.js 保存，供下一次叠加计算使用
    };
}

/**
 * 独立的亲戚查询引擎（供搜索面板使用）
 * @param {string} queryText - 用户输入的查询文本 (如 "爸爸的弟弟的儿子")
 * @returns {object} { title: '格式化后的结果', rawResults: [] }
 */
function queryKinship(queryText) {
    if (typeof relationship === 'undefined') {
        return { title: '核心引擎未加载', rawResults: [] };
    }
    
    try {
        const results = relationship({ text: queryText, sex: 1 });
        if (results && results.length > 0) {
            // 进行口语化转换
            const formattedResults = results.map(title => {
                let t = title;
                t = t.replace(/^小姑$/, '姑姑');
                t = t.replace(/姑父/g, '姑丈');
                t = t.replace(/^小姨$/, '阿姨');
                t = t.replace(/^姨妈$/, '阿姨');
                t = t.replace(/姨父/g, '姨丈');
                t = t.replace(/姑表/g, '表');
                t = t.replace(/姨表/g, '表');
                t = t.replace(/^姨(哥|弟|姐|妹)$/, '表$1');
                t = t.replace(/^姑(哥|弟|姐|妹)$/, '表$1');
                return t;
            });
            const uniqueResults = [...new Set(formattedResults)];
            return { 
                title: uniqueResults.join(' 或 '), 
                rawResults: uniqueResults 
            };
        } else {
            return { title: '未找到标准称呼，可能是关系太远或输入有误', rawResults: [] };
        }
    } catch (e) {
        console.error("查询失败", e);
        return { title: '查询出错', rawResults: [] };
    }
}
