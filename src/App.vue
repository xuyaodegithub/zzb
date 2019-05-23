<template>
  <div id="app" :class="{'back' : $route.name=='登录'}">
    <header-sub></header-sub>
    <transition name="slide">
      <router-view class="child"/>
    </transition>
    <footerSub v-show="list.indexOf($route.name)>-1"></footerSub>
  </div>
</template>

<script>
  import headerSub from '@/components/header/index'
  import footerSub from '@/components/footer/index'
export default {
  name: 'App',
  data(){
    return {
      list:['首页','我的']
    }
  },
  components:{
    headerSub,footerSub
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  min-height: 100%;
}
.back{
  background-color: #ffffff;
}
.slide-enter-active {
  transform: translateX(100%);
}
.slide-leave-active {
  transform: translateX(-100%);
}
.slide-enter, .slide-leave-to {
  /*opacity: 0;*/
}
  .child{
    transition: .15s;
  }
</style>
