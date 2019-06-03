// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/public.css'//公共样式css
import './assets/reset.css'//公共样式css
import './assets/iconfont.css'
import $ from 'jquery'
// import Vant from 'vant';
import 'vant/lib/index.css';
import * as filters from './filters/filter'
import VueLazyload from 'vue-lazyload'
import store from './store'
Object.keys(filters).map((val,index)=>{
  Vue.filter(val,filters[val])
  // console.log(val,filters[val])
})
// Vue.use(Vant);
Vue.use(VueLazyload, {
  loading:"/static/logo.png",
  preLoad:1
})
Vue.config.productionTip = false
Vue.prototype.$http=axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  $,
  store,
  router,
  components: { App },
  template: '<App/>'
})
