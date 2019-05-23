<template>
<div class="bindCard">
    <div>
      <van-cell-group>
        <van-field
          input-align="right"
          v-model="username"
          label="姓名"
          :readonly="true"
        />
        <van-field
          input-align="right"
          :value="idNum | personalCardId"
          label="身份证号"
          :readonly="true"
        />
        <van-field
          ref='refBank'
          input-align="right"
          type="number"
          v-model="personal.bankNo"
          label="银行卡号"
          placeholder="请输入银行卡号"
        />
        <van-field
          ref='refBank'
          input-align="right"
          type="number"
          v-model="personal.mobile"
          label="手机号码"
          placeholder="请输入银行预留手机号"
        />
        <van-field
          type="number"
          v-model="personal.mesCode"
          label="验证码"
          placeholder="请输入验证码"
        >
        <div class="getcode"
          slot="button"
        >
          获取验证码
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
              bankNo: '111111111111111111111',
              mesCode: '',
              mobile: '15255899632'
            },
            keyboardShow: false,
            countdown: 60, // 倒计时
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
      mounted(){},
      computed:{},
      methods:{
        fetchConfirmCardMsg(){
          Toast({
            type:'success',
            message:'绑卡成功',
            mask:true,
            duration:1500
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
      padding-left: .3rem;
      border-left: 1px solid #D8D8D8;
      color: #2F81FF;
      font-size: .3rem;
    }
    .notice-box{
      font-size: .24rem;
      line-height: .34rem;
      padding: 0 .32rem;
      color: #777;
    }
  }

</style>
