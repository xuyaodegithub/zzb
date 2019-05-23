<template>
<!--  银行卡列表-->
  <div>
  <header-sub></header-sub>
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
