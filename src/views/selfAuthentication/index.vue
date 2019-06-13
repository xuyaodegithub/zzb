<template>
    <div class="Authentication">
        <div class="AuthenticationItem flex">
          <img src="../../assets/image/idCard.png" alt="">
          <div>
            <p>身份认证</p>
            <p>请使用本人身份证认证</p>
          </div>
          <div class="Authentication_btn" @click="Authentication(1)" :style="{opacity:+selfStatusInfo.status>0 ? '0.5' : 1 }">
            立即认证
          </div>
        </div>
        <div class="AuthenticationItem flex">
          <img src="../../assets/image/self.png" alt="">
          <div>
            <p>个人信息</p>
            <p>保证个人信息真实有效</p>
          </div>
          <div class="Authentication_btn" @click="Authentication(2)" :style="{opacity:+selfStatusInfo.status>1 ? '0.5' : 1 }">
            立即认证
          </div>
        </div>
        <div class="AuthenticationItem flex">
          <img src="../../assets/image/bankCard.png" alt="">
          <div>
            <p>银行卡认证</p>
            <p>请绑定您的银行卡</p>
          </div>
          <div class="Authentication_btn" @click="Authentication(3)" :style="{opacity:+selfStatusInfo.status>2 ? '0.5' : 1 }">
            立即认证
          </div>
        </div>
      <div class="btn">
          <div class="btn_btn" :class="{'active' : selfStatusInfo.status!=='3'}" @click="nextTo()">下一步</div>
      </div>
    </div>
</template>

<script>
  import { selfAuthentication } from '@/apis/index';
  import {  Toast } from 'vant';
    export default {
        name: "Authentication",
      data(){
          return {
            selfStatusInfo:''
          }
      },
      components:{
        [Toast.name]:Toast
      },
      computed:{},
      mounted(){
          this.getSelfStatus()
      },
      methods:{
        Authentication(key){
          if(this.selfStatusInfo.status==='3'){
            Toast('所有信息已认证，请点击下一步进行借款.');
            return
          }
            if(key===1){
              if(this.selfStatusInfo.status==='0') this.$router.push('/ocrCard')
              else  Toast('身份已认证,请进行其他认证.');
            }else if(key===2) {
              if(this.selfStatusInfo.status==='1') this.$router.push('/personInfo')
              else if(this.selfStatusInfo.status==='0') Toast('请先进行身份认证.');
              else if(this.selfStatusInfo.status==='2') Toast('个人信息已认证,请进行银行卡认证.');
              // else  Toast('个人信息已认证,请进行银行卡认证.');
            }else if(key===3) {
              if(this.selfStatusInfo.status==='2') this.$router.push('/bindCard')
              else if(this.selfStatusInfo.status==='0') Toast('请先进行身份认证.');
              else if(this.selfStatusInfo.status==='1') Toast('请先进行个人信息认证.');
            }
        },
        getSelfStatus(){
          selfAuthentication().then(res=>{
            if(!res.resultCode){
              this.selfStatusInfo=res.data
            }else{
              Toast(`${res.resultMessage}`);
            }
          })
        },
        nextTo(){
          if(this.selfStatusInfo.status!=='3') return;
          this.$router.push('/personInfo')
        }
      },
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
    & > .btn{
      margin-top: 2rem;
      .btn_btn{
        font-size: .36rem;
        background-color: #2F81FF;
        line-height: .9rem;
        color: #fff;
        text-align: center;
        border-radius: 0.08rem;
      }
      .active{
        opacity: .6;
      }
    }
  }

</style>
