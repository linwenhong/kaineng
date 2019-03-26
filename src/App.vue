<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    $('body').append('<script src="static/js/contabs.js"><\/script>')
    $('body').append('<script src="static/js/hplus.js?v=4.1.0"><\/script>')
  }
}
</script>

<style>
@import "../static/css/bootstrap.min.css";
@import "../static/css/datepicker3.css";
@import "../static/css/font-awesome.min.css";
@import "../static/css/plugins/iCheck/custom.css";
@import "../static/css/plugins/blueimp/css/blueimp-gallery.min.css";
@import "../static/css/plugins/sweetalert/sweetalert.css";
@import "../static/css/plugins/clockpicker/clockpicker.css";
@import "../static/css/animate.css";
@import "../static/css/style.css";
@import "../static/css/plugins/simditor/simditor.css";
@import "../static/css/plugins/toastr/toastr.min.css";

@import "../node_modules/@riophae/vue-treeselect/dist/vue-treeselect.min.css";
.vue-treeselect { width: 200px; }

#content-main {
  height: calc(100% - 79px);
}
#wrapper {
  min-width: 1000px;
}
#app {
  height: 100%;
  overflow-y: auto;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input.help-block {
  margin-top: 0;
}
.modal-body input {
  margin-top: 0;
}
.table th {
  text-align: center;
}
img.icon {
  display: block;
  width: 50px;
  height: 25px;
  margin: 0 auto;
  background-size: 100%
}
.file {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
}
.btn_file {
  position: relative;
}
.modal-header, .modal-footer {
  padding: 10px !important;
}
.form-group select, .form-group span {
  margin: 0;
}
.form-horizontal .form-group {
  margin-left: 0;
  margin-right: 0;
}
/* 表格排序 */
.sort {
  cursor: pointer;
}
.sortText {
  position: relative;
  padding-left: 15px;
}
.sortIcon {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -6px;
}
.sortIcon.desc{
  margin-top: -12px;
}
.sortIconOption .fa {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -6px;
}
.orderIcon i {
  margin: 0 10px;
  cursor: pointer;
  font-size: 18px;
}
ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.MustFill {
  color: red;
}

.search-page label {
  line-height: 34px;
  text-align: right;
  display: inline-block;
}
.search-page label, .search-page input, .search-page select, .search-page .searchOption {
  display: inline-block;
}
.search-page input, .search-page select {
  width: 150px;
}
.search-page label {
  margin-left: 10px;
  margin-right: 5px;
}
.search-page .searchOption {
  width: 200px;
}
.search-page .searchOption .searchSelect {
  top: 16px;
}
.view-img img {
  display: inline-block;
  max-width: 200px;
  max-height: 200px;
  margin-top: 5px;
  background-size: 100%;
}

.layer-date {
  width: 100px;
  margin-top: -8px;
}

#nestable .dd-handle {
  cursor: move;
}
#nestable .dd-item .label-primary {
  position: absolute;
  right: 50px;
  top: 6px;
  width: 28px;
  height: 20px;
  cursor: pointer;
}
#nestable .dd-item .label-danger {
  position: absolute;
  right: 10px;
  top: 6px;
  width: 28px;
  height: 20px;
  cursor: pointer;
}


#page-wrapper {
  overflow-y: auto;
}
.border-bottom {
  position: fixed;
  width: 100%;
  z-index: 999;
}
.wrapper-content {
  padding-top: 55px;
}
.ibox {
  display: inline-block;
  min-width: 100%;
}
</style>
