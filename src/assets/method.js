'use strict'
function formatDate(time, format) { // 日期格式化
  var t = new Date(time);
  var tf = function(i){return (i < 10 ? '0' : '') + i};
  return format.replace(/yyyy|MM|dd|hh|mm|ss/g, function(a){
    switch(a){
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'hh':
        return tf(t.getHours());
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}

// 一维数组转树结构
function arrayTransformTree(data) {
  let result = []
  if(!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children;
  });
  let map = {};
  data.forEach(item => {
    map[item.id] = item;
  });
  data.forEach(item => {
    let parent = map[item.parent_id];
    if(parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}
// 树结构转一维数组
function treeTransformArray (nodes) {
  var result = [];
  if (Array.isArray(nodes)) {
    for (var i=0, l=nodes.length; i<l; i++) {
      result.push(nodes[i]); // 取每项数据放入一个新数组
      if (Array.isArray(nodes[i]["children"])&&nodes[i]["children"].length>0)
      // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
        result = result.concat(treeTransformArray(nodes[i]["children"]));
      delete nodes[i]["children"]
    }
  }
  return result;
}
// 树状拉下选项
function getTreeSelectOption(array, isSearch = false) {
  let result = []
  if (!isSearch) { // 非搜索
    result.push({
      id: 0,
      label: '无父级'
    })
  }
  if(!Array.isArray(array)) {
    return result
  }
  let data = array.map(item => {
    return {
      id: item.id,
      parent_id: item.parent_id,
      label: item.name
    }
  })
  let map = {};
  data.forEach(item => {
    map[item.id] = item;
  });
  data.forEach(item => {
    let parent = map[item.parent_id];
    if(parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

module.exports = {
  formatDate: (time, format) => {
    return formatDate(time, format)
  },
  arrayToTree: (data) => {
    return arrayTransformTree(data)
  },
  treeToArray: (nodes) => {
    return treeTransformArray(nodes)
  },
  getTreeSelectOption: (data, isSearch) => {
    return getTreeSelectOption(data, isSearch)
  }
}
