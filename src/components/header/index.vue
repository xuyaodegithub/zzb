<template>
    <div class="section">
      <div class="fixed" :class="{'noback' : $route.name==='我的'}">
        <van-icon name="arrow-left" class="backGo" v-if="!showBack" size="1em" @click="$router.go(-1)"/>
        {{headerTitle}}
      </div>
      <div class="slot"></div>
    </div>
</template>

<script>
  import { Icon } from 'vant';
    export default {
        name: "header",
      data(){
          return {
            whiteList:['登录','首页','我的']
          }
      },
      components:{
        [Icon.name]: Icon,
      },
      mounted(){},
      computed:{
          headerTitle(){
            return  this.$route.name
          },
        showBack(){
            return this.whiteList.indexOf(this.$route.name) > -1
        }
      },
      methods:{},
    }
</script>

<style scoped lang="scss">
  .section{
    line-height: 0.9rem;
    font-size: 0.36rem;
    text-align: center;
    color: #ffffff;
    .slot{
      height: 0.9rem;
    }
    .fixed{
      background-color: #2F81FF !important;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 999;
    }
    .noback{
      /*background-color:#0F77E4 !important;*/
    }
    .backGo{
      position: absolute;
      top: 50%;
      left: 0.32rem;
      margin-top: -0.18rem;
    }
  }

</style>
