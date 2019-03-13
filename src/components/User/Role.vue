<template>
  <div class="wrapper wrapper-content">
    <div class="text-right">
      <router-link :to="'/admin/roleDetails/new'">
        <button type="button" class="btn btn-w-m btn-primary">新建角色</button>
      </router-link>
    </div>

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>角色权限管理</h5>
      </div>

      <div class="ibox-content">

        <table class="table table-bordered text-center">
          <thead>
          <tr>
            <th>编号</th>
            <th>角色名称</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) of items" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <router-link :to="'/admin/roleDetails/' + item.id">
                <button type="button" class="btn btn-sm btn-primary">编辑</button>
              </router-link>
              <delete @delConfirm="delConfirm" v-bind:item="item"></delete>
            </td>
          </tr>
          </tbody>
        </table>
        <!--<vue-pagination :current-page="page" :total="total" :page-size="size" @current-change="pageChange" theme="gray"></vue-pagination>-->

      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import Service from '@/assets/service/service'
export default {
  name: 'Role',
  data () {
    return {
      items: [],
      total: 0,
      page: 1,
      size: 10,
      condition: {}
    }
  },
  methods: {
    getDataTables (page) {
      const condition = {}
//      condition['page'] = page
      for (const key in this.condition) {
        if (this.condition[key]) {
          condition[key] = this.condition[key]
        }
      }
      Service.getRole(condition).then(response => {
        if (response.status == 200) {
//          this.page = page
//          this.items = response.data.data
//          this.total = response.data.total
          this.items = response.data
        }
      })
    },
    pageChange (page) {
      this.getDataTables(page)
    },
    delConfirm (item) {
      Service.delRole(item.id).then(response => {
        if (response.status == 200) {
          toastr.success(response.msg)
          this.getDataTables()
        } else {
          toastr.error(response.msg)
        }
      })
    }
  },
  created () {
    this.getDataTables()
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
