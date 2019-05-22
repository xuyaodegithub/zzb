<template>
    <section>
      <van-icon name="close" />
      {{headerTitle}}
    </section>
</template>

<script>
    export default {
        name: "index",
      data(){
          return {

          }
      },
      mounted(){},
      computed:{
          headerTitle(){
            return  this.$route.name
          }
      },
      methods:{},
    }
</script>

<style scoped>

</style>
