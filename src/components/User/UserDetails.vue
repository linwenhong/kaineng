<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>用户详情</h5>
      </div>

      <div class="ibox-content">
        <form class="form-horizontal" @submit.prevent="submit">

          <div class="form-group">
            <div class="col-sm-6">
              <label class="col-sm-4 control-label">登录名</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="form.username" disabled>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-6">
              <label class="col-sm-4 control-label">姓名</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="form.name">
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-6">
              <label class="col-sm-4 control-label">手机号码</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="form.phone">
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-6">
              <label class="col-sm-4 control-label">角色名称</label>
              <div class="col-sm-8" v-if="form.username != 'admin'">
                <select class="form-control" v-model="form.r_id" :disabled="!canEditRole">
                  <option v-for="role of roles" :value="role.id" :key="role.id">{{ role.name }}</option>
                </select>
              </div>
              <div class="col-sm-8" v-if="form.username == 'admin'">
                <input type="text" class="form-control" :value="'超级用户'" disabled>
              </div>
            </div>
          </div>

          <div class="form-group" v-if="form.username != 'admin'">
            <div class="col-sm-6">
              <label class="col-sm-4 control-label">数据权限</label>
              <div class="col-sm-8">
                <select class="form-control" v-model="form.data_permission" :disabled="!canEditRole">
                  <option value="all">全部</option>
                  <option value="own">自己</option>
                </select>
              </div>
            </div>
          </div>

          <template v-if="canShow">
            <hr>
            <div class="form-group" v-if="!isAdmin || this.form.username == 'admin'">
              <div class="col-sm-6">
                <label class="col-sm-4 control-label">旧密码</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" v-model="form.old_password">
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="col-sm-6">
                <label class="col-sm-4 control-label">新密码</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" v-model="form.new_password">
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="col-sm-6">
                <label class="col-sm-4 control-label">确认密码</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" v-model="form.new_password2">
                </div>
              </div>
            </div>
          </template>

          <div class="form-group">
            <div class="col-sm-6">
              <div class="text-center">
                <b v-if="isManager" class="btn btn-white" @click="cancel">返回</b>
                <b v-if="!canShow" class="btn btn-warning" @click="restart">重置密码</b>
                <b v-if="canShow" class="btn btn-white" @click="cancelRestart">取消密码重置</b>
                <button type="submit" class="btn btn-primary">保存</button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import Cache from '@/assets/cache'
export default {
  name: 'UserDetails',
  data () {
    return {
      id: this.$route.params['id'],
      roles: [],
      form: {},
      canShow: false,
      canEditRole: false,
      isManager: false, // 是否有用户管理权限
      isAdmin: false // 是否超级用户
    }
  },
  methods: {
    submit () {
      const request = this.form
      if (this.canShow) {
        if (!this.form['new_password'] || !this.form['new_password2']) {
          toastr.warning('请输入密码')
          return
        } else if (this.form['new_password'] != this.form['new_password2']) {
          toastr.warning('密码不一致')
          return
        } else {
          if (this.form['old_password']) {
            request['old_password'] = this.form['old_password']
          }
          request['new_password'] = this.form['new_password']
        }
      }
      this.$Service.User.edit(this.id, request).then(response => {
        if (response.status == 200) {
          toastr.success('保存成功')
          if (this.isManager) {
            setTimeout(() => this.cancel(), 1000)
          }
        } else {
          toastr.error(response.msg)
        }
      })
    },
    restart () {
      this.canShow = true
    },
    cancelRestart () {
      this.canShow = false
    },
    cancel () {
      this.$router.push('/admin/user')
    }
  },
  created () {
    this.roles = []
    this.$Service.User.details(this.id).then(response => {
      if (response.status == 200) {
        this.form = response.data
      }
    })
    if (($.inArray('admin', Cache.getUser().permission) > -1) || ($.inArray('user', Cache.getUser().permission) > -1)) {
      this.canEditRole = true
      this.isManager = true
    }
    if ($.inArray('admin', Cache.getUser().permission) > -1) {
      this.isAdmin = true
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .btn {
    margin-bottom: 0;
  }
  label.title {
    font-size: 18px;
    font-weight: bold;
  }
</style>
