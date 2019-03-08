<template>
  <input type="text" class="form-control limitNumber" v-model="form[key]">
</template>

<script>
export default {
  name: 'my-input',
  props: ['form', 'key'],
  data () {
    return {}
  },
  mounted () {
    $(document).on('keyup', '.limitNumber,.allowMinus', function (e) {
      //修复第一个字符是小数点 的情况.
      let fa = ''
      if (this.classList.contains('allowMinus')) { //或者$(this).hasClass('allowMinus')
        this.value.substring(0, 1) === '-' && (fa = '-')
      }
      if (this.value !== '' && this.value.substr(0, 1) === '.') {
        this.value = "";
      }
      this.value = this.value.replace(/^0*(0\.|[1-9])/, '$1');//解决 粘贴不生效
      console.log(this.value)
      this.value = this.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
      this.value = this.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
      if (this.value.indexOf(".") < 0 && this.value !== "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        if (this.value.substr(0, 1) === '0' && this.value.length === 2) {
          this.value = this.value.substr(1, this.value.length);
        }
      }
      this.value = fa + this.value
    })
  },
  methods: {

  }
}
</script>
