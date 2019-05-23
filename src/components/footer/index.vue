<template>
    <div class="flex a-i j-b">
      <div v-for="(val,index) in menuList" :key="index" :class="{'active' : val.title==headerTitle}" @click="goWant(val)">
        <img :src="val.title==headerTitle? val.imgS : val.img" alt="">
        <p>{{val.title}}</p>
      </div>
    </div>
</template>

<script>
  import ls from '../../assets/image/footer-l.png'
  import lsn from '../../assets/image/footer-l-n.png'
  import lr from '../../assets/image/footer-r-n.png'
  import lrn from '../../assets/image/footer-r.png'
    export default {
        name: "index",
      data(){
          return {
              menuList:[
                {title:'首页',img:lsn,imgS:ls,path:'/home'},
                {title:'我的',img:lrn,imgS:lr,path:'/userCenter'},
              ]
          }
      },
      mounted(){},
      computed:{
        headerTitle(){
          return  this.$route.name
        }
      },
      methods:{
        goWant(item){
          if(item.path==this.$route.path) return
          this.$router.push(item.path)
        }
      },
    }
</script>

<style scoped lang="scss">
.flex{
  background-color: #ffffff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 0.22rem;
  color: #7B7B7B;
  padding: 0.18rem 1.6rem;
  line-height: 0.32rem;
  z-index: 1111;
  div{
    min-width: 0.5rem;
    text-align: center;
  }
  .active{
    color: #2F81FF;
  }
  img{
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    margin: 0 auto;
    margin-bottom: 0.08rem;
  }
}
</style>
