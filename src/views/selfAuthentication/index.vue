<template>
    <div class="Authentication">
        <div class="AuthenticationItem flex">
          <img src="../../assets/image/idCard.png" alt="">
          <div>
            <p>身份认证</p>
            <p>请使用本人身份证认证</p>
          </div>
          <div class="Authentication_btn" @click="Authentication(1)">
            立即认证
          </div>
        </div>
        <div class="AuthenticationItem flex">
          <img src="../../assets/image/self.png" alt="">
          <div>
            <p>个人信息</p>
            <p>保证个人信息真实有效</p>
          </div>
          <div class="Authentication_btn" @click="Authentication(2)">
            立即认证
          </div>
        </div>
        <div class="AuthenticationItem flex">
          <img src="../../assets/image/bankCard.png" alt="">
          <div>
            <p>银行卡认证</p>
            <p>请绑定您的银行卡</p>
          </div>
          <div class="Authentication_btn" @click="Authentication(3)">
            立即认证
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Authentication",
      data(){
          return {

          }
      },
      components:{},
      computed:{},
      methods:{
        Authentication(key){
            if(key===1) this.$router.push('/ocrCard')
            else if(key===2) this.$router.push('/personInfo')
            else if(key===3) this.$router.push('/bindCard')
        }
      },
      mounted(){}
    }
</script>

<style scoped lang="scss">
  $btn:#2F81FF;
  .Authentication{
    padding: .4rem .46rem;
    .AuthenticationItem{
      position: relative;
      background-color: #ffffff;
      padding: .32rem .44rem;
      font-size: .3rem;
      line-height: .42rem;
      color: #333333;
      align-items: center;
      margin-bottom: .4rem;
      box-shadow: 0 .02rem .1rem 0 rgba(0,0,0,0.14);
      border-radius: .08rem;
      img{
        width: 1.2rem;
        height: 1.2rem;
        margin-right: .12rem;
      }
      p:last-child{
        font-size: .24rem;
        line-height: .34rem;
        color: #969696;
        margin-top: .02rem;
      }
      .Authentication_btn{
        position: absolute;
        font-size: .26rem;
        color: #fff;
        line-height: .44rem;
        width: 1.4rem;
        text-align: center;
        background-color: $btn;
        top: 50%;
        margin-top: -0.22rem;
        right: .44rem;
        border-radius:.22rem ;
      }
    }
  }

</style>
