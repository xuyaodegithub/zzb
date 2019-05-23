<template>
<!--  我的贷款列表-->
  <div>
  <header-sub></header-sub>
  我的贷款列表
  <footer-sub></footer-sub>
</div>
</template>

<script>
  import headerSub from '@/components/header/index'
  import footerSub from '@/components/footer/index'
    export default {
        name: "index",
      data(){
          return {

          }
      },
      components:{
        headerSub,footerSub
      },
      mounted(){},
      computed:{},
      methods:{},
    }
</script>

<style scoped>

</style>
