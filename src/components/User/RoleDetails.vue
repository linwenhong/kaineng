<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>角色详情</h5>
      </div>

      <div class="ibox-content">
        <form class="form-horizontal" @submit.prevent="submit">

          <div class="form-group">
            <div class="col-lg-4 col-sm-6">
              <label class="col-sm-4 control-label">角色名称</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="name">
              </div>
            </div>
            <div class="col-lg-3 col-sm-6">
              <button type="submit" class="btn btn-primary">保存</button>
              <b class="btn btn-white" @click="cancel">返回</b>
            </div>
          </div>

          <div class="form-group" v-for="(data, index) of groups">
            <div class="col-lg-3 col-sm-12">
              <div class="checkbox i-checks">
                <label class="title">{{ data.title }}</label>
                <a @click="selectGroup(index)">全选</a>
              </div>
            </div>
            <div class="col-lg-9 col-sm-12">
              <div class="col-lg-4 col-sm-6" v-for="item of data.group">
                <div class="checkbox i-checks">
                  <label>
                    <input name="permissions" type="checkbox" :value="item.id"><i></i>{{ item.title }}</label>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import Method from '@/assets/method'
import Service from '@/assets/service/service'
export default {
  name: 'RoleDetails',
  data () {
    return {
      id: this.$route.params['id'],
      permissions: [],
      name: '',
      groups: [
        {
          title: '医生管理',
          group: [
//            { title: '医生等级管理', id: 2 },
            { title: '医院管理', id: 21 },
            { title: '科室管理', id: 22 },
            { title: '医生管理', id: 1 }
          ]
        },
        {
          title: '会员管理',
          group: [
            { title: '咨询者管理', id: 3 },
            { title: '医生粉丝/咨询者关注', id: 4 },
            { title: '咨询者留言查询', id: 18 }
          ]
        },
        {
          title: '药品信息管理',
          group: [
            { title: '药品管理', id: 5 },
            { title: '医生查询失败情况', id: 6 }
          ]
        },
        {
          title: '建议订单管理',
          group: [
            { title: '所有订单查询', id: 9 },
            { title: '待审核订单', id: 7 },
            // { title: '处理异常订单-取消订单', id: 8 },
            // { title: '处理异常订单-退款', id: 20 }
            { title: '异常订单', id: 20 }
          ]
        },
        {
          title: '咨询订单管理',
          group: [
            { title: '所有订单查询', id: 24 }
          ]
        },
        {
          title: '就医陪护订单管理',
          group: [
            { title: '所有订单查询', id: 25 }
          ]
        },
        {
          title: '费用管理',
          group: [
//            { title: '医生等级费用管理', id: 10 },
            { title: '推荐管理', id: 16 },
            { title: '陪护管理', id: 23 },
            { title: '医生结算登记及查询', id: 11 }
          ]
        },
        {
          title: '统计查询',
          group: [
            { title: '医生咨询统计', id: 12 },
            { title: '药品使用统计', id: 13 }
          ]
        },
        {
          title: '用户管理',
          group: [
            { title: '用户管理', id: 14 },
            { title: '角色权限管理', id: 15 }
          ]
        },
        {
          title: '系统设置',
          group: [
            { title: '系统设置', id: 17 }
          ]
        }
      ]
    }
  },
  methods: {
    selectGroup (index) {
      Method.setCheckBoxVal(this.groups[index].group, 'permissions')
    },
    submit () {
      if (!this.name) {
        toastr.warning('请输入角色名')
        return
      }
      const permissions = Method.getCheckedVal('permissions')
      if ($.inArray('20',permissions) > -1){
       permissions.push('8')
      }
      if (permissions.length == 0) {
        toastr.warning('请勾选角色权限')
        return
      }
      const request = {
        name: this.name,
        permission_id: permissions
      }
      if (this.id == 'new') {
        Service.addRole(request).then(response => {
          if (response.status == 200) {
            toastr.success('添加角色成功')
            setTimeout(() => this.cancel(), 1000)
          }
        })
      } else {
        Service.editRole(this.id, request).then(response => {
          if (response.status == 200) {
            toastr.success('修改角色成功')
            setTimeout(() => this.cancel(), 1000)
          }
        })
      }
    },
    cancel () {
      this.$router.push('/admin/role')
    }
  },
  created () {
    Service.getPermission().then(response => {
      if (response.status == 200) {
        this.permissions = response.data
      }
    })
  },
  mounted () {
    Method.iCheck()
    if (this.id != 'new') {
      Service.getRoleDetails(this.id).then(response => {
        if (response.status == 200) {
          this.name = response.data.name
          Method.setCheckBoxVal(response.data.permission, 'permissions')
        }
      })
    }
  }
}
</script>

<style scoped>
  .btn-primary {
    margin-bottom: 0;
  }
  label.title {
    font-size: 18px;
    font-weight: bold;
  }
</style>
