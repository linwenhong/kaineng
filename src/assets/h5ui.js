'use strict'

// 单/复选框样式
function iCheck (select = false) {
  if (select) {
    var interval = setInterval(function(){
      if($(select).length > 0){
        $('.i-checks').iCheck({
          checkboxClass: 'icheckbox_square-green',
          radioClass: 'iradio_square-green'
        })
        clearInterval(interval);
        return;
      }
    }, 20);
  } else {
    $('.i-checks').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green'
    })
  }
}

// 清除复选框选中状态
function clearChecked () {
  $('.checkbox input').each(function () {
    this.checked = false
  })
  $('.checked').removeClass('checked')
}

// 获取.checkbox下复选框选中的值,传入复选框name值
function getChecked (name) {
  var result = []
  $('.checkbox .checked input[name=' + name + ']').each(function () {
    result.push($(this).val())
  })
  return result
}

// 添加表单验证
function validate (e) {
  return $(e).validate()
}
// 重置表单
function resetForm (validate, isClear) {
  validate.resetForm()
  $('.form-group').removeClass('has-success')
  $('.form-group').removeClass('has-error')
  if (isClear) {
    clearChecked()
  }
}

// 下拉搜索框
function setSearchSelect (data, select, keys, valueKey, textKey) {
  let items = []
  items = data.map((item, index) => {
    const value = {}
    keys.map(key => {
      value[key] = item[key]
    })
    return value
  })

  $(select).bsSuggest({
    idField: valueKey, //data.value 的数据，作为input输入框的data-id
    keyField: textKey, //data.value 的数据，作为input输入框的text
    data: {
      value: items
    }
  })
}

module.exports = {
  iCheck: (select) => {
    iCheck(select)
  },
  clearChecked: () => {
    clearChecked()
  },
  getChecked: (name) => {
    return getChecked(name)
  },
  validate: (select) => {
    return validate(select)
  },
  reset: (validate, isClear = false) => {
    resetForm(validate, isClear)
  },
  setSearchSelect: (data, select, keys = ['id', 'name'], valueKey = 'id', textKey = 'name') => {
    setSearchSelect(data, select, keys, valueKey, textKey)
  }
}
