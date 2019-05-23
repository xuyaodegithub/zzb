<template>
  <div class="section">
    <div class="flex a-i j-b">
      <div>
        <van-uploader :after-read="onRead" accept="image/*">
          <img src="../../assets/image/peoper.png" alt="" v-if="!isup">
          <img :src="isup" alt="图片加载错误" v-else>
        </van-uploader>
      </div>
      <div>
        <van-uploader :after-read="onRead" accept="image/*">
          <img src="../../assets/image/coun.png" alt="" v-if="!isdown">
          <img :src="isdown" alt="图片加载错误" v-else>
        </van-uploader>
      </div>
    </div>
    <div class="bittom">
      <img src="../../assets/image/fexzp.png" alt="">
      <div class="btn" :class="{'active' : isdown && isup }" @click="nextTo()">下一步</div>
    </div>
    <div class="zhezhao" v-show="showModel"></div>
    <div class="warning" v-show="showModel">
      <img src="../../assets/image/error.png" alt="">
      身份证识别错误 请重新上传
    </div>
  </div>

</template>

<script>
  import { Uploader } from 'vant';
    export default {
        name: "index",
      data(){
          return {
              isup:'',
              isdown:'',
              showModel:false
          }
      },
      components:{
          [Uploader.name]:Uploader
      },
      mounted(){},
      computed:{},
      methods:{
        nextTo(){
          // if(!isup || !isdown) return
          this.$router.push('/personInfo')
        },
        onRead(file) {
          console.log(file)
        }
      },
    }
</script>

<style scoped lang="scss">
  .section{
    /*min-height: 100%;*/
    background-color: #F6F6F6;
    .flex{
      background-color: #ffffff;
      padding: 0.32rem;
      img{
        display: block;
        width: 3.3rem;
        height: 2.5rem;
      }
    }
    .bittom{
      margin-top: 0.36rem;
      padding:0 0.32rem ;
      img{
        display: block;
        width: 100%;
      }
      .btn{
        margin-top: 2.8rem;
        font-size: 0.36rem;
        line-height: .9rem;
        background-color: #2F81FF;
        opacity: .5;
        color: #fff;
        border-radius: 0.1rem;
        text-align: center;
      }
      div.active{
        opacity: 1;
      }
    }
    .warning{
      z-index: 999;
      position: fixed;
      top: 50%;
      left: 50%;
      width: 2.56rem;
      height: 2.56rem;
      color: #fff;
      background-color: #20232D;
      border-radius: 0.1rem;
      margin-top: -1.28rem;
      margin-left: -1.28rem;
      text-align: center;
      font-size: .28rem;
      padding: 0 .28rem;
      img{
        display: block;
        width: .64rem;
        height: .64rem;
        margin: .32rem auto .52rem;
      }
    }
  }
</style>
