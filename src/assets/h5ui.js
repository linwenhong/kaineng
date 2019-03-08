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

// 添加表单验证
function validate (e) {
  return $(e).validate()
}
// 重置表单
function resetForm (validate, isClear = false) {
  validate.resetForm()
  $('.form-group').removeClass('has-success')
  $('.form-group').removeClass('has-error')
  if (isClear) {
    clearChecked()
  }
}

module.exports = {
  iCheck: (select) => {
    iCheck(select)
  },
  validate: (select) => {
    return validate(select)
  },
  reset: (validate, isClear = false) => {
    resetForm(validate, isClear)
  }
}
