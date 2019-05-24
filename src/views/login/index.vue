<template>
    <section>
      <!--<header-sub></header-sub>-->
      <div class="logo">分期淘</div>
      <div class="content">
        <div class="relate">
          <input type="number" class="phone" placeholder="请输入手机号" v-model="phone" maxlength="11" @input="changeValve()">
          <img src="../../assets/image/clear.png" alt="" v-show="phone.length>0" @click="phone=''">
        </div>
        <div class="flex a-i j-b">
          <div class="relate">
            <input type="number" placeholder="请输入验证码" v-model="code" @blur="gotop()">
            <img src="../../assets/image/clear.png" alt="" v-show="code.length>0" @click="code=''">
          </div>
          <button @click="sendCode()" :class="{'btnopa' : phone.length!=11 || CountDown>0 }">{{CountDown>0 ? CountDown : '发送验证码'}}</button>
        </div>
        <p class="XY">登录即表示您同意 <span @click="check()"> 《分期淘服务协议》</span></p>
        <div class="loginBtn" :class="{'loginactive' : !iscanLogin}" @click="userLogin()">
          登录
        </div>
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
      },
      computed:{
          iscanLogin(){
            return this.phone.length===11 && this.code.length>=6
          }
      },
      methods:{
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
          this.$router.push('/serviceAgreement')
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
      input{
        height: 0.5rem;
        line-height: 0.5rem;
        border: none;
      }
      .phone{
        display: block;
        width: 100%;
        padding: 0.25rem 0;
        border-bottom: 1px solid #EAE8E8;
        margin-bottom: 0.36rem;
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
      }
    }
    .flex {
      padding: 0.15rem 0;
      border-bottom: 1px solid #EAE8E8;
      div {
        flex: 1;
        border: none;
      }
      input{
        width: 100%;
      }
      button{
        font-size: 0.28rem;
        height: 0.72rem;
        line-height: 0.72rem;
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
