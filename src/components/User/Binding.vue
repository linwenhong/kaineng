<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>账号绑定</h5>
      </div>

      <div class="ibox-content">
        <div id="qrcode"></div>
        <div style="margin-top: 10px">
          <p>请扫码绑定微信号</p>
        </div>

        <info-confirm @confirm="confirm" :data="user" title="确定要解除当前账号与微信的关联吗？" text="微信解绑"></info-confirm>

      </div>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Binding',
  data () {
    return {
      user: this.$store.getters.getUser,
      identity: this.$store.getters.getIdentity
    }
  },
  methods: {
    confirm (user) {
      const request = {
        login_name: user.login_name
      }
      if (this.identity == 1) {
        this.$Service.Auth.untying(request).then(response => {
          if (response.err_code) {
            toastr.error(response.err_msg, response.err_code)
          } else {
            toastr.success('解绑成功')
          }
        })
      }
      if (this.identity == 2) {
        this.$Service.AdminAuth.untying(request).then(response => {
          if (response.err_code) {
            toastr.error(response.err_msg, response.err_code)
          } else {
            toastr.success('解绑成功')
          }
        })
      }
    },
    setCodeImg (url) {
      new QRCode("qrcode", {
        text: url,
        width: 240,
        height: 240,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    }
  },
  created () {

  },
  mounted () {
    if (this.identity == 1) {
      this.$Service.Auth.qrCode().then(response => {
        if (response.qr_code) {
          this.setCodeImg(response.qr_code)
        }
      })
    }

    if (this.identity == 2) {
      this.$Service.AdminAuth.qrCode().then(response => {
        if (response.qr_code) {
          this.setCodeImg(response.qr_code)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
