import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },{
      path: '/login',
      name: '登录',
      component:() => import(/* webpackChunkName: "login" */'@/views/login/index')
    },{
      path: '/home',
      name: '首页',
      component:() => import(/* webpackChunkName: "home" */'@/views/home/index')
    },{
      path: '/selfAuthentication',
      name: '个人认证',
      component:() => import(/* webpackChunkName: "selfAuthentication" */'@/views/selfAuthentication/index')
    },{
      path: '/bindCard',
      name: '绑定银行卡',
      component:() => import(/* webpackChunkName: "bindCard" */'@/views/bindCard/index')
    },{
      path: '/ocrCard',
      name: '绑定身份证',
      component:() => import(/* webpackChunkName: "ocrCard" */'@/views/ocrCard/index')
    },{
      path: '/personInfo',
      name: '填写个人信息',
      component:() => import(/* webpackChunkName: "personInfo" */'@/views/personInfo/index')
    },{
      path: '/signing',
      name: '签约',
      component:() => import(/* webpackChunkName: "signing" */'@/views/signing/index')
    },{
      path: '/userCenter',
      name: '我的',
      component:() => import(/* webpackChunkName: "userCenter" */'@/views/userCenter/index')
    },{
      path: '/updataCard',
      name: '编辑银行卡',
      component:() => import(/* webpackChunkName: "cardList" */'@/views/userCenter/updataCard/index')
    },{
      path: '/cardList',
      name: '我的银行卡',
      component:() => import(/* webpackChunkName: "cardList" */'@/views/userCenter/bindCard/index')
    },{
      path: '/serviceAgreement',
      name: '服务协议',
      component:() => import(/* webpackChunkName: "serviceAgreement" */'@/views/serviceAgreement/index')
    },{
      path: '/load',
      name: '我的借款',
      component:() => import(/* webpackChunkName: "load" */'@/views/userCenter/load/index')
    },{
      path: '/loadDetail',
      name: '借款详情',
      component:() => import(/* webpackChunkName: "loadDetail" */'@/views/userCenter/load/detail')
    },{
      path: '/repayment',
      name: '付款',
      component:() => import(/* webpackChunkName: "loadDetail" */'@/views/userCenter/load/repayment')
    },{
      path: '/delay',
      name: '延期',
      component:() => import(/* webpackChunkName: "loadDetail" */'@/views/userCenter/load/delay')
    },{
      path: '/Conact',
      name: '联系客服',
      component:() => import(/* webpackChunkName: "loadDetail" */'@/views/userCenter/Conact/index')
    },{
      path: '/downLoad',
      name: '下载',
      component:() => import(/* webpackChunkName: "loadDetail" */'@/views/downLoad/index')
    }
  ],
  scrollBehavior (to, from, savedPosition) {//路由切换时滚轮位置//scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    }else{
      // return { x: 0, y:0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  document.title=to.name

  next();
})
export default router
