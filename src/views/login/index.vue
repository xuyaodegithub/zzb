<template>
    <section>
      <!--<header-sub></header-sub>-->
      <div class="top_login">
        <img src="../../assets/image/login.png" alt="">
      </div>
      <!--<div class="logo">分期淘</div>-->
      <div class="content">
        <h4>分期淘</h4>
        <div class="relate">
          <input type="number" class="phone" placeholder="请输入手机号" v-model="phone" maxlength="11" @input="changeValve()">
          <img src="../../assets/image/clear.png" alt="" v-show="phone.length>0" @click="phone=''">
        </div>
        <div class="flex a-i j-b">
          <div class="relate codeDiv">
            <input type="number" placeholder="请输入6位验证码" v-model="code" class="codeInput">
            <img src="../../assets/image/clear.png" alt="" v-show="code.length>0" @click="code=''">
          </div>
          <button @click="sendCode()" :class="{'btnopa' : phone.length!=11 || CountDown>0 }">{{CountDown>0 ? CountDown : '发送验证码'}}</button>
        </div>
        <div class="loginBtn" :class="{'loginactive' : !iscanLogin}" @click="userLogin()">
          登录
        </div>
        <!--<p class="XY">登录即表示您同意 <span @click="check()"> 《分期淘服务协议》</span></p>-->
      </div>
    </section>
</template>

<script>
  import headerSub from '@/components/header/index'
  import { Dialog, Toast } from 'vant';
  import { loginIn, sendMsg } from '@/apis/index';
  import { setCookie, setStore, getStore } from '@/utils/storage.js';
    export default {
        name: "index",
      data(){
          return {
            phone:'',
            code:'',
            CountDown:0,
            timer:null
          }
      },
      components:{
        headerSub,Dialog
      },
      mounted(){
        this.getHistoryPhone()
        this.getaccessType()
      },
      computed:{
          iscanLogin(){
            return this.phone.length===11 && this.code.length>=6
          }
      },
      methods:{
        getaccessType () {
          let type = this.$route.query.accessType;
          console.log(type)
          if (!type) return;
          this.$store.commit('CHANG_APP', type);
        },
        gotop(){
          window.scrollTo(0,0)
        },
        sendCode(){
          if(this.phone.length<11 || this.CountDown>0 ) return
          sendMsg(this.phone).then(res=>{
            if (!res.resultCode) {
              Toast(`已发送短信`);
              // 发送短信
              if (!this.timer) {
                this.CountDown=60
                this.timer = setInterval(() => {
                  if (this.CountDown > 0) {
                    this.CountDown--;
                  } else {
                    this.CountDown = 0;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            } else {
              Toast(`${res.resultMessage}`);
            }
          })
        },
        changeValve(){
          if(this.phone.length>11) this.phone=this.phone.slice(0,11)
        },
        check(){
          // this.$store.commit()
          this.$router.push(`/serviceAgreement?type=1`)
          // Dialog.alert({
          //   title: '标题',
          //   message: '弹窗内容'
          // }).then(() => {
          //   // on close
          // });

        },
        getHistoryPhone () {//获取历史登录手机
          let phoneNum = getStore('phoneNum');
          this.phone = phoneNum || this.phone;
        },
        userLogin(){
          if(!this.iscanLogin) return
          loginIn(this.phone, this.code).then(res=>{
            if (!res.resultCode) {
              this.$router.push('/home');
              setCookie('Token', res.data.token);
              setStore('name', res.data.name);
              setStore('phoneNum', this.phone);
            } else {
              Toast(`${res.resultMessage}`);
            }
          })
        }
      },
    }
</script>

<style scoped lang="scss">
  $bk:#2F81FF;
  section{
    /*min-height: 100%;*/
    .top_login img{
      display: block;
      width: 100%;
    }
    .logo{
      width: 1.3rem;
      line-height: 1.3rem;
      background-color: $bk;
      text-align: center;
      font-size: 0.36rem;
      color: #ffffff;
      border-radius: 0.24rem;
      /*margin: 1.46rem auto 1.5rem;*/
    }
    .content{
      width: 6.86rem;
      margin: 0 auto;
      font-size: 0.32rem;
      padding: 0.54rem 0.64rem .68rem .70rem;
      box-shadow: 0 .4rem .4rem 0 rgba(0,0,0,.2);
      position: relative;
      top: -1.2rem;
      background-color: #ffffff;
      border-radius: .26rem;
      h4{
        font-size: .48rem;
        color: #2F81FF;
        text-align: center;
        line-height: .66rem;
        margin-bottom: .52rem;
      }
      input{
        height: 0.5rem;
        line-height: 0.5rem;
        border: none;
      }
      .phone,.codeInput{
        display: block;
        width: 100%;
        background-color: #F5F5F5;
        line-height: .5rem;
        height: .88rem;
        text-indent: .2rem;
        border-radius: 0.08rem;
        margin:0 auto 0.4rem;
      }
      .relate{
        position: relative;
        img{
          position: absolute;
          right: 0.3rem;
          top: 50%;
          margin-top: -0.21rem;
          width: 0.42rem;
          height: 0.42rem;
        }
        .codeInput{
          width: 3.36rem;
          margin: 0;
        }
      }
      .relate.codeDiv{
        margin-right: .36rem;
      }
    }
    .flex {
      div {
        border: none;
      }
      input{
        width: 100%;
      }
      button{
        font-size: 0.28rem;
        height: 0.88rem;
        line-height: 0.88rem;
        width: 1.72rem;
        text-align: center;
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
