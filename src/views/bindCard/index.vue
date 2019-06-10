<template>
<div class="bindCard">
    <div>
      <van-cell-group>
        <van-field
          left-icon="icon iconfont icon-xingming"
          input-align="right"
          v-model="username"
          label="姓名"
          :readonly="true"
        />
        <van-field
          left-icon="icon iconfont icon-shenfenzheng"
          input-align="right"
          :value="idNum | personalCardId"
          label="身份证号"
          :readonly="true"
        />
        <van-field
          left-icon="icon iconfont icon-yinhangqia"
          ref='refBank'
          input-align="right"
          type="number"
          v-model="personal.bankNo"
          label="银行卡号"
          placeholder="请填写您的卡号"
        />
        <van-field
          left-icon="icon iconfont icon-icon--"
          ref='refBank'
          input-align="right"
          type="number"
          v-model="personal.mobile"
          label="手机号码"
          placeholder="请输入银行预留手机号"
          :maxlength="11"
        />
        <van-field
          left-icon="icon iconfont icon-yanzhengma"
          type="number"
          v-model="personal.mesCode"
          label="验证码"
          placeholder="请输入验证码"
        >
        <div class="getcode"
          slot="button" @click="fetchpreBindCard()">
          {{countdown>0 ? countdown : '获取验证码'}}
        </div>
        </van-field>
      </van-cell-group>
    </div>
    <div class="aurora-area-15">
      <div class="aurora-btn-box" @click="fetchConfirmCardMsg()">提交
      </div>
    </div>
    <div class="notice-box">
      <p>1.请绑定本人名下的有效银行卡;</p>
      <p>2.请绑定银行预留手机号码为注册手机号码的银行卡;</p>
      <p>3.请绑定储蓄卡，不支持信用卡;</p>
    </div>
</div>
</template>

<script>
  import headerSub from '@/components/header/index'
  import footerSub from '@/components/footer/index'
  import { CellGroup, Cell, Field, NumberKeyboard, Button, Toast } from 'vant';
  import { PHONE } from '@/utils/regex.js';
  import { preBindCard, confirmCardMsg, getUserInfo } from '@/apis/index';
    export default {
        name: "index",
      data(){
          return {
            username: '李四',
            alreadySubmit: false,
            idNum: '34444445589645555',
            personal: {
              bankNo: '',
              mesCode: '',
              mobile: ''
            },
            keyboardShow: false,
            countdown: 0, // 倒计时
            timer: null
          }
      },
      components:{
        headerSub,footerSub,
        [CellGroup.name]: CellGroup,
        [Cell.name]: Cell,
        [Field.name]: Field,
        [NumberKeyboard.name]: NumberKeyboard,
        [Button.name]: Button,
        [Toast.name]: Toast
      },
      mounted(){
          this.getUserInfo()
      },
      computed:{},
      methods:{
        getUserInfo () {//个人信息
          getUserInfo().then(res=>{
            if (!res.resultCode) {
              this.username = res.data.name;
              this.idNum = res.data.idCardNo;
              this.personal.mobile = res.data.phone;
            }
          });
        },
        fetchpreBindCard () {//获取验证码
          if(this.countdown>0) return;
          let bankNo = this.personal.bankNo.replace(/\s+/g, '');
          if (!bankNo) {
            Toast(`请输入银行卡号`);
            return;
          }
          if(this.personal.mobile.length!==11){
            Toast(`手机号错误`);
            return;
          }
          Toast.loading({
            mask: true,
            message: '加载中...'
          });
          preBindCard(
            bankNo,
            this.username,
            this.personal.mobile
          ).then(res=>{
            Toast.clear()
            if (!res.resultCode) {
              if (res.data.sendStatus === '1') {
                Toast('短信已发送');
                // 发送短信
                if (!this.timer) {
                  this.countdown=60
                  this.timer = setInterval(() => {
                    if (this.countdown > 0) {
                      this.countdown--;
                    } else {
                      this.countdown = 0;
                      // this.isSend = false
                      clearInterval(this.timer);
                      this.timer = null;
                    }
                  }, 1000);
                }
              } else {
                Toast(`${res.data.sendMsg}`);
              }
            } else {
              Toast(`${res.resultMessage}`);
            }
          });
        },
        fetchConfirmCardMsg(){
          if(this.personal.mesCode.length<1){
            Toast('请输入验证码');
            return
          }
          if(this.personal.mobile.length!==11){
            Toast(`手机号错误`);
            return;
          }
          let bankNo = this.personal.bankNo.replace(/\s+/g, '');
          Toast.loading({
            mask: true,
            message: '加载中...'
          });
          confirmCardMsg(
            this.personal.mesCode,
            bankNo,
            this.username,
            this.personal.mobile).then(res=>{
              Toast.clear()
            if (!res.resultCode) {
              if (res.data.bindStatus) {
                Toast({type:'success',message:res.data.bindMsg,mask:true,duration:1500});
                // Toast(`${res.data.bindMsg}`);
                this.$router.replace('/cardList');
              } else {
                Toast(`${res.data.bindMsg}`);
              }
            } else {
              Toast(`${res.resultMessage}`);
            }
          });
        }
      },
    }
</script>

<style scoped lang="scss">
  .bindCard{
    .aurora-area-15{
      padding: .9rem .32rem .34rem;
      .aurora-btn-box{
        font-size: .36rem;
        color: #ffffff;
        text-align: center;
        line-height: .9rem;
        background-color: #2F81FF;
        border-radius: .1rem;
      }
    }
    .getcode{
      text-align: center;
      padding-left: .3rem;
      border-left: 1px solid #D8D8D8;
      color: #2F81FF;
      font-size: .3rem;
      min-width: 1.8rem;
    }
    .notice-box{
      font-size: .24rem;
      line-height: .34rem;
      padding: 0 .32rem;
      color: #777;
    }
  }

</style>
