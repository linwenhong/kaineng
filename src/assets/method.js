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

module.exports = {
  iCheck: (select) => {
    iCheck(select)
  }
}
