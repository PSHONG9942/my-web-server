// DOM 元素
const welcomeScreen = document.getElementById('welcome-screen');
const mainScreen = document.getElementById('main-screen');
const startBtn = document.getElementById('start-btn');
const userNameInput = document.getElementById('user-name-input');
const networkContainer = document.getElementById('network-container');

// LocalStorage UI 元素
const newTreeForm = document.getElementById('new-tree-form');
const loadTreeForm = document.getElementById('load-tree-form');
const continueBtn = document.getElementById('continue-btn');
const restartBtn = document.getElementById('restart-btn');

// Modal 元素
const addModal = document.getElementById('add-modal');
const cancelBtn = document.getElementById('cancel-add-btn'); // 修正了 ID
const confirmAddBtn = document.getElementById('confirm-add-btn');
const relationTypeSelect = document.getElementById('relation-type');
const ageRelativeGroup = document.getElementById('age-relative-group');
const ageRelativeName = document.getElementById('age-relative-name');
const targetNodeNameSpan = document.getElementById('target-node-name');
const relativeNameInput = document.getElementById('relative-name');

// Action Menu 元素
const actionMenu = document.getElementById('action-menu');
const actionNodeTitle = document.getElementById('action-node-title');
const btnOpenAdd = document.getElementById('btn-open-add');
const btnOpenEdit = document.getElementById('btn-open-edit');
const btnDeleteNode = document.getElementById('btn-delete-node');
const cancelActionBtn = document.getElementById('cancel-action-btn');

// Edit Modal 元素
const editModal = document.getElementById('edit-modal');
const editNameInput = document.getElementById('edit-name-input');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const confirmEditBtn = document.getElementById('confirm-edit-btn');

// 状态变量
let network = null;
let nodesData = [];
let linksData = [];
let currentNodeId = null; // 当前被点击准备添加亲戚的节点ID
let nodeIdCounter = 1;

// 存档功能
function saveToLocal() {
    const dataToSave = {
        nodes: nodesData,
        counter: nodeIdCounter
    };
    localStorage.setItem('familyTreeData', JSON.stringify(dataToSave));
}

// 智能连线生成器 (核心引擎)
function generateLinks() {
    let newLinks = [];
    const linkSet = new Set();
    
    function addLink(source, target, label) {
        if (!source || !target) return;
        // 使用固定的 key 格式防止双向重复连线
        const key = source < target ? `${source}-${target}-${label}` : `${target}-${source}-${label}`;
        if (!linkSet.has(key)) {
            linkSet.add(key);
            newLinks.push({ source, target, label });
        }
    }

    nodesData.forEach(node => {
        // 1. 父母 -> 子女连线
        if (node.parents) {
            node.parents.forEach(pid => {
                addLink(pid, node.id, '父母/子女');
            });
        }
        // 2. 配偶连线
        if (node.spouses) {
            node.spouses.forEach(sid => {
                addLink(node.id, sid, '配偶');
            });
        }
        // 3. 显式兄弟姐妹连线 (在没有父母的情况下使用)
        if (node.siblings) {
            node.siblings.forEach(sid => {
                addLink(node.id, sid, '兄弟姐妹');
            });
        }
    });

    // 4. 隐式兄弟姐妹连线 (如果共享至少一位父母，则自动视为兄弟姐妹)
    for (let i = 0; i < nodesData.length; i++) {
        for (let j = i + 1; j < nodesData.length; j++) {
            const n1 = nodesData[i];
            const n2 = nodesData[j];
            if (n1.parents && n2.parents && n1.parents.length > 0 && n2.parents.length > 0) {
                const sharedParent = n1.parents.some(p => n2.parents.includes(p));
                if (sharedParent) {
                    addLink(n1.id, n2.id, '兄弟姐妹');
                }
            }
        }
    }

    return newLinks;
}

// 初始化基础网络
function initNetwork(options) {
    if (options.savedData) {
        // 读取存档
        nodesData = options.savedData.nodes;
        nodeIdCounter = options.savedData.counter;
    } else {
        // 基础节点，加入了 parents, spouses, siblings 属性
        const userName = options.userName || '我';
        nodesData = [
            { id: 1, label: userName, title: '自己', desc: '自己', gender: 'unknown', isSelf: true, color: getNodeColor('unknown', true), parents: [2, 3], spouses: [], siblings: [] },
            { id: 2, label: '爸爸', title: '爸爸', desc: '爸爸', gender: 'male', color: getNodeColor('male'), parents: [4, 5], spouses: [3], siblings: [] },
            { id: 3, label: '妈妈', title: '妈妈', desc: '妈妈', gender: 'female', color: getNodeColor('female'), parents: [6, 7], spouses: [2], siblings: [] },
            { id: 4, label: '爷爷', title: '爷爷', desc: '爷爷', gender: 'male', color: getNodeColor('male'), parents: [], spouses: [5], siblings: [] },
            { id: 5, label: '奶奶', title: '奶奶', desc: '奶奶', gender: 'female', color: getNodeColor('female'), parents: [], spouses: [4], siblings: [] },
            { id: 6, label: '外公', title: '外公', desc: '外公', gender: 'male', color: getNodeColor('male'), parents: [], spouses: [7], siblings: [] },
            { id: 7, label: '外婆', title: '外婆', desc: '外婆', gender: 'female', color: getNodeColor('female'), parents: [], spouses: [6], siblings: [] },
        ];
        nodeIdCounter = 8;
        saveToLocal(); // 首次初始化后存档
    }

    // 自动生成初始连线
    linksData = generateLinks();

    // 初始化 3D Force Graph
    network = ForceGraph3D()(networkContainer)
        .graphData({ nodes: nodesData, links: linksData })
        .backgroundColor('#0f172a') // 匹配 CSS 的背景色
        .nodeThreeObject(node => {
            const group = new THREE.Group();

            // 1. 发光核心球体 (Core)
            const coreGeometry = new THREE.SphereGeometry(3, 16, 16);
            const coreMaterial = new THREE.MeshBasicMaterial({ 
                color: node.color,
                transparent: true,
                opacity: 0.8
            });
            const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
            
            // 2. 外部半透明发光光晕 (Aura)
            const auraGeometry = new THREE.SphereGeometry(5.5, 16, 16);
            const auraMaterial = new THREE.MeshBasicMaterial({ 
                color: node.color, 
                transparent: true, 
                opacity: 0.3,
                blending: THREE.AdditiveBlending // 赛博朋克发光混合模式
            });
            const auraSphere = new THREE.Mesh(auraGeometry, auraMaterial);

            // 3. 悬浮全息称呼 (Hologram Title)
            const spriteTitle = new SpriteText(node.title);
            spriteTitle.color = '#fbbf24'; // 金黄色，显得更加尊贵和清晰
            spriteTitle.textHeight = 4.5;
            spriteTitle.fontWeight = 'bold';
            spriteTitle.position.y = 9; // 较高位置
            
            // 确保文字永远渲染在最前面，不被星球遮挡
            spriteTitle.material.depthTest = false;
            spriteTitle.renderOrder = 999;

            // 4. 悬浮全息名字 (Hologram Name)
            const spriteName = new SpriteText(`(${node.label})`);
            spriteName.color = '#cbd5e1'; // 浅灰/银色，作为辅助信息
            spriteName.textHeight = 3.2;
            spriteName.position.y = 5; // 较低位置，紧贴星球
            
            // 同样确保文字不被遮挡
            spriteName.material.depthTest = false;
            spriteName.renderOrder = 999;

            group.add(coreSphere);
            group.add(auraSphere);
            group.add(spriteTitle);
            group.add(spriteName);

            // 如果是"自己"，加一个特别的光环
            if (node.isSelf) {
                const ringGeo = new THREE.TorusGeometry(8, 0.5, 16, 100);
                const ringMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.8 });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.PI / 2;
                group.add(ring);
            }

            return group;
        })
        .linkColor(() => 'rgba(148, 163, 184, 0.4)')
        .linkWidth(1)
        .onNodeClick(node => {
            // 将相机移动到被点击的节点
            const distance = 60;
            const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
            network.cameraPosition(
                { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // 新位置
                node, // 视角中心
                2000  // 动画时长 (ms)
            );
            
            // 打开操作菜单而不是直接添加
            openActionMenu(node.id);
        });

    // 粒子动画效果（让连线看起来有能量流动）
    network.linkDirectionalParticles(2)
           .linkDirectionalParticleWidth(1.5)
           .linkDirectionalParticleSpeed(0.005);
           
    // 默认：镜头飞向“自己”
    setTimeout(() => {
        const selfNode = nodesData.find(n => n.id === 1 || n.isSelf);
        if (selfNode && network) {
            const distance = 80;
            const distRatio = 1 + distance/Math.hypot(selfNode.x || 1, selfNode.y || 1, selfNode.z || 1);
            network.cameraPosition(
                { x: (selfNode.x||0) * distRatio, y: (selfNode.y||0) * distRatio, z: (selfNode.z||0) * distRatio },
                selfNode,
                2000
            );
        }
    }, 1500); // 稍微延迟等待物理引擎稳定
}

// 页面加载时检查存档
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('familyTreeData');
    if (saved) {
        newTreeForm.classList.add('hidden');
        loadTreeForm.classList.remove('hidden');
    }
});

// 继续上次编辑
continueBtn.addEventListener('click', () => {
    const saved = localStorage.getItem('familyTreeData');
    if (saved) {
        welcomeScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        initNetwork({ savedData: JSON.parse(saved) });
    }
});

// 重新开始
restartBtn.addEventListener('click', () => {
    localStorage.removeItem('familyTreeData');
    loadTreeForm.classList.add('hidden');
    newTreeForm.classList.remove('hidden');
});

// 事件监听器：开始探索
startBtn.addEventListener('click', () => {
    const name = userNameInput.value.trim() || '我';
    welcomeScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    initNetwork({ userName: name });
});

// 事件监听器：回车键提交
userNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startBtn.click();
});

// ====== 模态框控制逻辑 ======

// 1. 操作菜单 (Action Menu)
function openActionMenu(nodeId) {
    currentNodeId = nodeId;
    const node = nodesData.find(n => n.id === nodeId);
    if (!node) return;

    actionNodeTitle.textContent = `${node.title} (${node.label})`;
    
    // 如果是"自己"，不允许删除
    if (node.isSelf) {
        btnDeleteNode.style.display = 'none';
    } else {
        btnDeleteNode.style.display = 'block';
    }

    actionMenu.classList.remove('hidden');
}

function closeActionMenu() {
    actionMenu.classList.add('hidden');
}

cancelActionBtn.addEventListener('click', () => {
    closeActionMenu();
    currentNodeId = null;
});

btnOpenAdd.addEventListener('click', () => {
    closeActionMenu();
    openAddModal(currentNodeId);
});

btnOpenEdit.addEventListener('click', () => {
    closeActionMenu();
    openEditModal(currentNodeId);
});

btnDeleteNode.addEventListener('click', () => {
    closeActionMenu();
    deleteNode(currentNodeId);
    currentNodeId = null;
});

// 2. 添加亲戚 (Add Modal)
function openAddModal(nodeId) {
    currentNodeId = nodeId;
    const node = nodesData.find(n => n.id === nodeId);
    
    if(!node) return;

    targetNodeNameSpan.textContent = `${node.title} (${node.label})`;
    ageRelativeName.textContent = node.title;
    
    // 重置表单
    relationTypeSelect.value = 'father';
    document.querySelector('input[name="gender"][value="male"]').checked = true;
    relativeNameInput.value = '';
    ageRelativeGroup.style.display = 'none';

    addModal.classList.remove('hidden');
}

function closeAddModal() {
    addModal.classList.add('hidden');
    currentNodeId = null;
}

cancelBtn.addEventListener('click', closeAddModal);

// 3. 编辑名字 (Edit Modal)
function openEditModal(nodeId) {
    currentNodeId = nodeId;
    const node = nodesData.find(n => n.id === nodeId);
    if(!node) return;

    editNameInput.value = node.label; // 填入当前名字
    editModal.classList.remove('hidden');
}

function closeEditModal() {
    editModal.classList.add('hidden');
    currentNodeId = null;
}

cancelEditBtn.addEventListener('click', closeEditModal);

confirmEditBtn.addEventListener('click', () => {
    if (!currentNodeId) return;
    const node = nodesData.find(n => n.id === currentNodeId);
    if (node) {
        const newName = editNameInput.value.trim();
        if (newName) {
            node.label = newName;
            
            // 强制 3d-force-graph 重新评估所有节点的 3D 对象，从而更新悬浮文字
            // 这是在不改变物理引擎状态下刷新视觉的最安全方法
            network.nodeThreeObject(network.nodeThreeObject());
            saveToLocal(); // 修改名字后存档
        }
    }
    closeEditModal();
});

// 4. 删除节点逻辑
function deleteNode(nodeId) {
    const nodeIndex = nodesData.findIndex(n => n.id === nodeId);
    if (nodeIndex === -1) return;
    
    // 保护中心节点
    if (nodesData[nodeIndex].isSelf) {
        alert('无法删除中心人物（自己）');
        return;
    }

    // 1. 从数组中移除该节点
    nodesData.splice(nodeIndex, 1);

    // 2. 深度清理：从其他节点的 parents, spouses, siblings 数组中移除这个 ID
    nodesData.forEach(node => {
        if (node.parents) {
            node.parents = node.parents.filter(id => id !== nodeId);
        }
        if (node.spouses) {
            node.spouses = node.spouses.filter(id => id !== nodeId);
        }
        if (node.siblings) {
            node.siblings = node.siblings.filter(id => id !== nodeId);
        }
    });

    // 重新生成连线并更新视图
    linksData = generateLinks();
    
    network.graphData({
        nodes: [...nodesData],
        links: [...linksData]
    });

    saveToLocal(); // 删除节点后存档
}


// 监听关系类型改变，如果是兄弟姐妹或子女，显示年龄比选择
relationTypeSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'brother' || val === 'sister' || val === 'child') {
        ageRelativeGroup.style.display = 'block';
        
        // 如果是添加孩子（比如叔叔的孩子，涉及堂表亲），判断依据通常是比"自己"大还是小
        if (val === 'child') {
            ageRelativeName.textContent = '自己';
        } else {
            // 添加兄弟姐妹时，是比被点击的长辈大还是小
            const node = nodesData.find(n => n.id === currentNodeId);
            if(node) ageRelativeName.textContent = node.title;
        }
    } else {
        ageRelativeGroup.style.display = 'none';
    }

    // 自动切换性别
    if (val === 'father' || val === 'brother') {
        document.querySelector('input[name="gender"][value="male"]').checked = true;
    } else if (val === 'mother' || val === 'sister') {
        document.querySelector('input[name="gender"][value="female"]').checked = true;
    }
});

// 确认添加节点
confirmAddBtn.addEventListener('click', () => {
    if (!currentNodeId) return;

    const baseNode = nodesData.find(n => n.id === currentNodeId);
    const relationType = relationTypeSelect.value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const ageRelative = document.querySelector('input[name="age-relative"]:checked').value;
    let customName = relativeNameInput.value.trim();

    // 1. 计算新节点的称呼和描述
    // 如果节点有保存的 desc 就使用，否则退化为使用 title (比如自己)
    const kinship = calculateKinship(baseNode.desc || baseNode.title, relationType, gender, ageRelative);
    
    if (!customName) {
        customName = kinship.title;
    }

    const newNodeId = nodeIdCounter++;
    
    // 2. 初始化新节点
    const newNode = {
        id: newNodeId,
        label: customName,
        title: kinship.title,
        desc: kinship.desc, // 保存给下一代人继续推导使用
        gender: gender,
        color: getNodeColor(gender),
        parents: [],
        spouses: [],
        siblings: []
    };

    // 3. 构建智能关系链
    if (relationType === 'father' || relationType === 'mother') {
        // 新节点是目标节点的父母
        if (!baseNode.parents) baseNode.parents = [];
        baseNode.parents.push(newNodeId);
        
        // 如果 baseNode 已经有其他父母，他们互为配偶
        baseNode.parents.forEach(pid => {
            if (pid !== newNodeId) {
                const otherParent = nodesData.find(n => n.id === pid);
                if (otherParent) {
                    if (!otherParent.spouses.includes(newNodeId)) otherParent.spouses.push(newNodeId);
                    if (!newNode.spouses.includes(pid)) newNode.spouses.push(pid);
                }
            }
        });
    } else if (relationType === 'child') {
        // 新节点是目标节点的子女
        newNode.parents.push(currentNodeId);
        // 如果目标节点有配偶，配偶也是新节点的父母
        if (baseNode.spouses) {
            baseNode.spouses.forEach(sid => {
                newNode.parents.push(sid);
            });
        }
    } else if (relationType === 'spouse') {
        // 新节点是目标节点的配偶
        if (!baseNode.spouses) baseNode.spouses = [];
        baseNode.spouses.push(newNodeId);
        newNode.spouses.push(currentNodeId);
    } else if (relationType === 'brother' || relationType === 'sister') {
        // 新节点是目标节点的兄弟姐妹
        // 隐式认亲：直接继承目标节点的父母
        if (baseNode.parents && baseNode.parents.length > 0) {
            newNode.parents = [...baseNode.parents];
        } else {
            // 没有父母，只能显式互相认作兄弟姐妹
            if (!baseNode.siblings) baseNode.siblings = [];
            baseNode.siblings.push(newNodeId);
            newNode.siblings.push(currentNodeId);
        }
    }

    // 将新节点加入数据模型
    nodesData.push(newNode);

    // 4. 触发智能连线并更新图表数据
    linksData = generateLinks();
    
    network.graphData({
        nodes: [...nodesData],
        links: [...linksData]
    });

    saveToLocal(); // 添加节点后存档
    closeAddModal();
});

// ====== 亲戚查询与雷达定位功能 (计算器模式) ======
const searchPanelToggle = document.getElementById('search-panel-toggle');
const searchToggleIcon = document.getElementById('search-toggle-icon');
const searchPanelContent = document.getElementById('search-panel-content');

const calcScreen = document.getElementById('calc-screen');
const calcBtns = document.querySelectorAll('.calc-btn');
const searchResultContainer = document.getElementById('search-result-container');
const searchResultTitle = document.getElementById('search-result-title');
const locateBtn = document.getElementById('locate-kinship-btn');

let calcQuery = "我";
let locatedNodeId = null;

// 展开/收起面板
searchPanelToggle.addEventListener('click', () => {
    searchPanelContent.classList.toggle('hidden');
    searchToggleIcon.textContent = searchPanelContent.classList.contains('hidden') ? '➕' : '➖';
});

// 执行查询与定位引擎
function executeCalculatorSearch() {
    // 如果只有“我”，清空结果
    if (calcQuery === "我" || calcQuery === "") {
        searchResultTitle.textContent = "-";
        locateBtn.classList.add('hidden');
        locatedNodeId = null;
        return;
    }

    // 1. 调用 logic.js 中的独立搜索引擎
    const result = queryKinship(calcQuery);
    searchResultTitle.textContent = result.title;
    searchResultContainer.classList.remove('hidden');
    locateBtn.classList.add('hidden');
    locatedNodeId = null;

    // 2. 智能匹配：在地毯式搜索 nodesData
    let matchedNode = nodesData.find(n => n.desc === calcQuery);
    
    if (!matchedNode && result.rawResults.length > 0) {
        matchedNode = nodesData.find(n => result.rawResults.includes(n.title));
    }
    
    if (!matchedNode) {
        matchedNode = nodesData.find(n => n.label === calcQuery);
    }

    if (matchedNode) {
        locatedNodeId = matchedNode.id;
        locateBtn.classList.remove('hidden');
        locateBtn.textContent = `📌 发现匹配目标: ${matchedNode.label}，点击定位`;
    }
}

// 绑定计算器按键事件
calcBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.id;
        const val = btn.getAttribute('data-val');

        if (action === 'calc-clear') {
            calcQuery = "我";
        } else if (action === 'calc-backspace') {
            if (calcQuery !== "我") {
                const parts = calcQuery.split('的');
                parts.pop(); // 移除最后一个
                calcQuery = parts.length > 0 ? parts.join('的') : "我";
            }
        } else if (val) {
            if (calcQuery === "我") {
                calcQuery = val;
            } else {
                calcQuery += `的${val}`;
            }
        }

        // 更新屏幕显示
        calcScreen.textContent = calcQuery;
        
        // 自动触发查询与雷达扫描
        executeCalculatorSearch();
    });
});

// 📌 定位按钮事件：3D 摄像机穿梭飞船
locateBtn.addEventListener('click', () => {
    if (!locatedNodeId || !network) return;
    
    // 从底层 3D 引擎获取该节点的实时空间坐标
    const node = network.graphData().nodes.find(n => n.id === locatedNodeId);
    if (node) {
        const distance = 50; // 定位后距离星球多远
        const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
        network.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // 新坐标
            node, // 锁定视角中心点为目标星球
            2500  // 星际穿梭动画时长 (ms)
        );
    }
});
