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

.search-page label {
  line-height: 34px;
  text-align: right;
  display: inline-block;
}
.search-page label, .search-page input, .search-page select {
  display: inline-block;
}
.search-page input, .search-page select {
  width: 150px;
}
.search-page label {
  margin-left: 10px;
  margin-right: 5px;
}

.layer-date {
  width: 100px;
  margin-top: -8px;
}
</style>
