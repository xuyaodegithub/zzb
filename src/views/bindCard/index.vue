<template>
<div>
  <header-sub></header-sub>
  绑定银行卡
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
