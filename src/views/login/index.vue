<template>
    <section>
      <header-sub></header-sub>
      <div class="logo">分期淘</div>
      <div class="content">
        <input type="number" class="phone" placeholder="请输入手机号" v-model="phone" maxlength="11" @input="changeValve()">
        <div class="flex a-i j-b">
          <input type="number" placeholder="请输入验证码" v-model="code">
          <button @click="sendCode()" :class="{'btnopa' : phone.length!=11}">发送验证码</button>
        </div>
        <p class="XY">登录即表示您同意 <span @click="check()"> 《分期淘服务协议》</span></p>
        <div class="loginBtn" :class="{'loginactive' :phone.length!=11 || code.length!=6 }">
          登录
        </div>
      </div>
    </section>
</template>

<script>
  import headerSub from '@/components/header/index'
  import { Dialog } from 'vant';
    export default {
        name: "index",
      data(){
          return {
            phone:'',
            code:''
          }
      },
      components:{
        headerSub,Dialog
      },
      mounted(){

      },
      computed:{},
      methods:{
        sendCode(){
          if(this.phone.length<11) return
          alert(1)
        },
        changeValve(){
          if(this.phone.length>11) this.phone=this.phone.slice(0,11)
        },
        check(){
          this.$router.push('/serviceAgreement')
          // Dialog.alert({
          //   title: '标题',
          //   message: '弹窗内容'
          // }).then(() => {
          //   // on close
          // });

        }
      },
    }
</script>

<style scoped lang="scss">
  $bk:#2F81FF;
  section{
    min-height: 100%;
    .logo{
      width: 1.3rem;
      line-height: 1.3rem;
      background-color: $bk;
      text-align: center;
      font-size: 0.36rem;
      color: #ffffff;
      border-radius: 0.24rem;
      margin: 1.46rem auto 1.5rem;
    }
    .content{
      font-size: 0.32rem;
      padding: 0 0.64rem;
    }
    .phone{
      display: block;
      width: 100%;
      padding: 0.3rem 0;
      border: none;
      border-bottom: 1px solid #EAE8E8;
      margin-bottom: 0.36rem;
    }
    .flex {
      padding: 0.15rem 0;
      border-bottom: 1px solid #EAE8E8;
      input {
        width: 60%;
        border: none;
      }
      button{
        font-size: 0.28rem;
        padding: 0.16rem;
        color: #ffffff;
        background-color: $bk;
        border-radius: 0.08rem;
      }
      .btnopa{
        opacity: 0.5;
      }
    }
    .XY{
      font-size: 0.26rem;
      color: #333;
      padding-top: 0.28rem;
      text-align: left;
      span{
        color: #2F81FF;
      }
    }
    .loginBtn{
      font-size: 0.36rem;
      color: #fff;
      text-align: center;
      line-height: 0.9rem;
      padding: 0 0.64rem;
      background-color: #2F81FF;
      border-radius: 0.08rem;
      margin-top: 0.8rem;
    }
    .loginactive{
      opacity: 0.5;
    }
  }
</style>
