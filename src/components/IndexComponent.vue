<template>
  <div id="wrapper">
    <!--左侧导航开始-->
    <nav class="navbar-default navbar-static-side" role="navigation">
      <div class="nav-close"><i class="fa fa-times-circle"></i>
      </div>
      <div class="sidebar-collapse">
        <ul class="nav" id="side-menu">
          <li class="nav-header">
            <div class="dropdown profile-element">
              <span><img alt="image" class="img-circle" src="/static/img/profile_small.jpg" /></span>
              <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="clear">
                               <span class="block m-t-xs"><strong class="font-bold"></strong></span>
                                <span class="text-muted text-xs block">{{ user.name }}<b class="caret"></b></span>
                                </span>
              </a>
              <ul class="dropdown-menu animated fadeInRight m-t-xs">
                <li><a class="J_menuItem" @click="goHref('/admin/user/' + user.id)">修改密码</a>
                </li>
                <li class="divider"></li>
                <li><a @click="logout">安全退出</a>
                </li>
              </ul>
            </div>
            <div class="logo-element">H+
            </div>
          </li>

          <li>
            <a href="#">
              <i class="fa fa-sitemap"></i>
              <span class="nav-label">系统设置</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level">
              <li>
                <a class="J_menuItem" @click="goHref('/admin/user')">用户管理</a>
              </li>
              <li>
                <a class="J_menuItem" @click="goHref('/admin/merchant-details')">商户信息</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              <i class="fa fa-sitemap"></i>
              <span class="nav-label">订单管理</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level">
              <li>
                <a class="J_menuItem" @click="goHref('/admin/order?pageType=1')">订单查询</a>
              </li>
              <li>
                <a class="J_menuItem" @click="goHref('/admin/order?pageType=2')">异常订单</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              <i class="fa fa-sitemap"></i>
              <span class="nav-label">财务管理</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level">
              <li>
                <a class="J_menuItem" @click="goHref('/admin/order-settlement')">待结算订单</a>
              </li>
              <li>
                <a class="J_menuItem" @click="goHref('/admin/order-settlement-logs')">商户结算记录</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              <i class="fa fa-sitemap"></i>
              <span class="nav-label">商户管理</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level">
              <li>
                <a class="J_menuItem" @click="goHref('/admin/merchant')">商户管理</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              <i class="fa fa-sitemap"></i>
              <span class="nav-label">商品管理</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level">
              <li>
                <a class="J_menuItem" @click="goHref('/admin/good-type')">商品分类管理</a>
              </li>
              <li>
                <a class="J_menuItem" @click="goHref('/admin/good-type-tree')">商品分类管理(树)</a>
              </li>
              <li>
                <a class="J_menuItem" @click="goHref('/admin/good')">商品管理</a>
              </li>
              <!--<li>-->
                <!--<a class="J_menuItem" @click="goHref('/admin/good-price')">商品价格管理</a>-->
              <!--</li>-->
              <li>
                <a class="J_menuItem" @click="goHref('/admin/good-upper-shelf')">商品上架</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              <i class="fa fa-sitemap"></i>
              <span class="nav-label">设备管理</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level">
              <li>
                <a class="J_menuItem" @click="goHref('/admin/manufacturer')">制造商管理</a>
              </li>
              <li>
                <a class="J_menuItem" @click="goHref('/admin/device')">设备管理</a>
              </li>
              <li>
                <a class="J_menuItem" @click="goHref('/admin/device-monitoring')">设备状态监测</a>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </nav>
    <!--左侧导航结束-->
    <!--右侧部分开始-->
    <div id="page-wrapper" class="gray-bg dashbard-1">
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
          <div class="navbar-header"><a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a></div>
        </nav>
      </div>
      <router-view />
    </div>
    <!--右侧部分结束-->
  </div>
</template>

<script type="text/ecmascript-6">
import Cache from '@/assets/cache'
export default {
  name: 'IndexComponent',
  data () {
    return {
      user: this.$store.getters.getUser
    }
  },
  methods: {
    goHref(url) {
      if ($('.dropdown.profile-element').hasClass('open')) {
        $('span.clear').click()
      }
      this.$router.push(url)
    },
    logout () {
      this.$store.dispatch('logout')
      this.$Service.Auth.logout()
    }
  },
  mounted () {
    $('body').append('<script src="static/js/contabs.js"><\/script>')
    $('body').append('<script src="static/js/hplus.js?v=4.1.0"><\/script>')
  },
  created () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
