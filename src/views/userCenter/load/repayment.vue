<template>
  <!--  还款界面-->
  <div class="repayment">
    <!--<div class="delay">-->
      <!--<div class="flex j-b a-i">-->
        <!--<span>订单号</span>-->
        <!--<span>2019010</span>-->
      <!--</div>-->
      <!--<div class="flex j-b a-i">-->
        <!--<span>借款金额</span>-->
        <!--<span>500元</span>-->
      <!--</div>-->
      <!--<div class="flex j-b a-i">-->
        <!--<span>延期至：</span>-->
        <!--<span>2019年10月10日</span>-->
      <!--</div>-->
    <!--</div>-->
    <!--银行卡-->
    <div class="flex a-i j-b bank" @click="showbank=true">
      <div class="flex a-i">
        <img :src="selectBank | bankIcon" alt="">
        {{selectBank.bankName}}({{selectBank.cardNo | cardNo}})
      </div>
      <img src="../../../assets/image/bankRight.png" alt="">
    </div>
    <div class="paymuch">
      <p class="ctitle">
        应还金额（{{paybackAmount}}元）
      </p>
      <div class="flex a-i inputDom j-b">
        <div>
          <span>CNY</span>
          <input type="number" v-model="moneyNum" placeholder="请输入还款金额">
        </div>
        <img src="../../../assets/image/clear.png" alt="" v-if="moneyNum>0" @click="moneyNum=''">
      </div>
    </div>
    <div class="sureBtn" @click="showcodePopup()">
      立即还款
    </div>
    <!--选择银行卡-->
    <van-popup
      position="bottom"
      v-model="showbank">
      <div class="popup_content">
        <img src="../../../assets/image/close.png" alt="" @click="showbank=false">
        <p class="addCard" @click="addCard()">添加银行卡</p>
        <h4>选择银行卡</h4>
        <div class="list">
          <div v-for="(item,index) in banklist" :key="index" class="itemC flex a-i" @click="choseItem(item,index)">
            <img src="../../../assets/image/chose.png" alt="" v-if="selectIndex===index" class="chose">
            <img :src="item | bankIcon" alt="" class="icon_i">
            <div>
              <p>{{item.bankName}}</p>
              <p>{{item.cardNo | cardNo}}</p>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!--输入验证码  :class="{'showCodePupo': showCodePupo}"-->
    <van-popup
      v-model="showCode"
      :close-on-click-overlay="false">
      <div class="showCode">
        <p>输入验证码</p>
        <p>还款需要短信确认，验证码已 发送至您手机{{phoneNum | mobileFilter}}</p>
        <!--<van-password-input-->
          <!--:value="verifyCode"-->
          <!--:mask="false"-->
          <!--@click.native="fuoseIn"-->
        <!--/>-->
        <input maxlength="6" type="number" v-model="verifyCode"  ref="invals" @input="changeValue" @blur="showCodePupo=false" @focus="showCodePupo=true">
        <!--showKeyboard = true-->
        <div class="codeBtn" :class="{'active' : verifyCode.length<6}" @click="paforMoney()">立即还款</div>
        <img src="../../../assets/image/close.png" alt="" @click="showCode=false">
      </div>
    </van-popup>
    <!--还款结果-->
    <van-popup
      v-model="showResult"
      :close-on-click-overlay="false">
      <div class="showResult">
        <img src="../../../assets/image/success.png" alt="" v-if="resultObj.playSatus">
        <img src="../../../assets/image/error.png" alt="" v-else>
        <p>{{resultObj.playSatus ? '还款成功' : '还款失败'}}</p>
        <p>{{resultObj.message}}</p>
        <div @click="toSureresult()">确定</div>
      </div>
    </van-popup>
    <!-- 数字键盘 -->
    <!--<van-number-keyboard-->
      <!--class="aurora-keyboard"-->
      <!--:show="showKeyboard"-->
      <!--@input="onInput"-->
      <!--@delete="onDelete"-->
      <!--:zIndex="9999"-->
      <!--close-button-text="完成"-->
      <!--@blur="showKeyboard = false"-->
    <!--/>-->
  </div>
</template>

<script>
  import jsbank from '@/assets/image/jsbank.png'
  import initlogo from '@/assets/image/initlogo.png'//默认
  import jslogo from '@/assets/image/jslogo.png'//建设
  import gslogo from '@/assets/image/gslogo.png'//工商
  import jtlogo from '@/assets/image/jtlogo.png'//交通
  import nylogo from '@/assets/image/nylogo.jpg'//农业
  import xylogo from '@/assets/image/xylogo.png'//兴业
  import zglogo from '@/assets/image/zglogo.png'//中国
  import zslogo from '@/assets/image/zslogo.jpg'//招商
  import bjlogo from '@/assets/image/bjlogo.jpg'//北京银行
  import gflogo from '@/assets/image/gflogo.png'//广发银行
  import gsicon from '@/assets/image/gsicon.png'
  import { PasswordInput, NumberKeyboard, Popup, Toast, Icon  } from 'vant';
  import { getBankList, handleRepayMes, getRepayment, getOrderInfo } from '@/apis/index';
  import { getStore } from '@/utils/storage.js';
  export default {
    name: "repayment",
    data() {
      return {
        verifyCodes:'',
        showCodePupo:false,
        moneyNum:+this.$route.query.paybackAmount,
        showbank:false,
        showKeyboard:false,
        showCode:false,
        showResult:false,
        paybackAmount:'',//需还金额
        selectBank:{bankCode:'',bankName:'',cardNo:''},
        banklist:[
          // {bankCode:'CCB',bankName:'中国建设银行',cardNo:'341125197809157070'},
          // {bankCode:'ICBC',bankName:'中国工商银行',cardNo:'341125197809157070'},
          // {bankCode:'CGB',bankName:'农业银行',cardNo:'341125197809157070'},
          // {bankCode:'BCCB',bankName:'招商银行',cardNo:'341125197809157070'},
        ],
        selectIndex:0,//默认选中第一个银行卡
        verifyCode:'',
        iconRelute:false,
        payorderId:'',//还款订单id
        resultObj:{},//订单返回结果

      }
    },
    components: {
      [PasswordInput.name]:PasswordInput,
      [NumberKeyboard.name]:NumberKeyboard,
      [Popup.name]:Popup,
      [Toast.name]:Toast,
      [Icon .name]:Icon ,
    },
    filters:{
      cardNo(val){
        return `**** ${val.slice(val.length-4)}`
      },
      bankIcon(val){
        if(val.bankCode==='CCB') return jslogo;
        else if(val.bankCode==='ICBC') return gslogo;
        else if(val.bankCode==='ABC') return nylogo;
        else if(val.bankCode==='BOC') return zglogo;
        else if(val.bankCode==='CMBCHINA') return zslogo;
        else if(val.bankCode==='CIB') return xylogo;
        else if(val.bankCode==='BOCO') return jtlogo;
        else if(val.bankCode==='BCCB') return bjlogo;
        else if(val.bankCode==='CGB') return gflogo;
        else return initlogo
      },
    },
    mounted() {
      this.fetchRepayInfo();
      this.fetchBankList();
    },
    computed: {
      orderId () {
        return this.$route.query.orderId;
      },
      phoneNum () {
        return getStore('phoneNum');
      },
      paybackAmountParam () {
        return this.$route.query.paybackAmount;
      },
      canRepay () {
        return +this.moneyNum > 0 && +this.moneyNum <= +this.paybackAmount;
      },
    },
    watch: {
      showCode (newVal) {
        if (!newVal) {
          this.verifyCode = '';
        }
      },
      // verifyCodes(newVal){
      //   if(newVal.length>6) this.verifyCode=this.verifyCodes.substring(0,6)
      //   else  this.verifyCode=this.verifyCodes
      // }
    },
    methods: {
      fuoseIn(){
        this.$refs.invals.focus()
        this.showCodePupo=true
      },
      changeValue(){
        let reg=/^[0-9]*$/
        // console.log(this.verifyCodes)
        if(this.verifyCode.length>6) this.verifyCode=this.verifyCode.substring(0,6);
        // else this.verifyCodes= this.verifyCodes.replace(/[^\d]/g, "");
        console.log(this.verifyCode)
      },
      addCard(){
        this.$router.push(`/bindCard?orderId=${this.orderId}&paybackAmount=${this.paybackAmountParam}`)
      },
      onInput (value) {
        this.verifyCode = (this.verifyCode + value).slice(0, 6);
      },
      onDelete () {
        this.verifyCode = this.verifyCode.slice(0, this.verifyCode.length - 1);
      },
      showcodePopup(){
        // this.showCode = true;//验证码弹框
        if (!this.canRepay) {
          Toast('金额不能大于还款金额，且不能为0');
          // this.repayAmount = this.$route.params.paybackAmount
          // this.$refs.repayAmoutRef.focus();
          return;
        }
        this.fetchRepayment();
        // this.showCode=true
        // this.verifyCode=''
      },
      choseItem(item,index){
        this.showbank=false;
        this.selectIndex=index;
        this.selectBank=item;
      },//////////////
      // windowResize () {
      //   this.showHeight = document.documentElement.clientHeight;
      //   if (this.showHeight < this.docmHeight) {
      //     this.isResize = true;
      //   } else {
      //     this.isResize = false;
      //   }
      // },
      // 获取还款信息
      fetchRepayInfo () {
        getOrderInfo(this.orderId).then(res=>{
          if (!res.resultCode) {
            this.paybackAmount = res.data.paybackAmount;
          }else{
            Toast(`${res.resultMessage}`);
          }
        });
      },
      // 获取银行卡列表
      fetchBankList () {
        getBankList().then(res=>{
          if (!res.resultCode) {
            this.banklist = res.data.bankCards;
            this.selectBank = res.data.bankCards[0];
            // let len = this.banklist.length;
            // this.checklist = new Array(len).fill(false);
            // this.checklist[0] = true;
          }
        });
      },
      // 立即还款
      fetchRepayment () {
        // this.alreadyPay = true;
        Toast.loading({
          mask: true,
          // message: '',
          duration:0
        });
        let cardIdx = this.selectBank['cardIdx'];
        let cardNo = this.selectBank['cardNo'];
        handleRepayMes(
          this.moneyNum,
          cardNo,
          cardIdx,
          this.orderId
        ).then(res=>{
          Toast.clear()
          if (!res.resultCode) {
            // this.alreadyPay = false;
            let _this = this;
            this.payorderId = res.data.payorderId;
            this.showCode = true;//验证码弹框
            // this.$nextTick(() => {
            //   _this.$refs.validateRef.focus();
            // });
          } else {
            // this.alreadyPay = false;
            Toast(`${res.resultMessage}`);
            this.showCode = false;
          }
        }).catch(err=>{
          Toast.clear()
        });
      },
      // 确认还款
      paforMoney () {//2确认按钮
        if(this.verifyCode.length<6) return;
        Toast.loading({
          duration:0,
          mask: true,
          message: '订单正在处理中,请稍后...'
        })
        // this.showloadVisi = true;
        // this.alreadyClick = true;
       getRepayment(this.verifyCode, this.payorderId).then(res=>{
         Toast.clear()
         this.showCode = false;
         this.showKeyboard = false;
         if (!res.resultCode) {
           // this.showloadVisi = false;
           // this.alreadyClick = false;
           this.resultObj = res.data;
           this.showResult = true;
         } else {
           this.verifyCode = '';
           Toast(`${res.resultMessage}`);
         }
       }).catch(err=>{
         Toast.clear()
         console.log(err)
       });
      },
      toSureresult(){
        this.showResult=false
        if(this.resultObj.playSatus) this.$router.replace('/home')
        else return
      }
      // handleCheck (index) {
      //   this.checklist = new Array(this.checklist.length).fill(false);
      //   this.checklist[index] = true;
      // },
    },
  }
</script>

<style scoped lang="scss">
  .delay{
    padding: .46rem .4rem .48rem;
    background-color: #fff;
    font-size: .26rem;
    line-height: .36rem;
    color: #7B7B7B;
    margin-bottom: .2rem;
    & > div{
      margin-bottom: .16rem;
    }
    & > div:last-child{
      color: #F95963;
      margin: 0;
    }
  }
.bank{
  font-size: .3rem;
  line-height: .42rem;
  padding: .3rem .4rem;
  background-color: #ffffff;
  border-bottom: 1px solid #DFDFDF;
  color: #3B3B3B;
  div img{
    width: .38rem;
    height: .38rem;
    margin-right: .24rem;
  }
  & > img{
    width: 0.11rem;
    height: .23rem;
  }
}
.paymuch{
  padding:0.36rem .4rem .38rem;
  background-color: #ffffff;
  .inputDom{
    font-size: .4rem;
    line-height: .56rem;
    color: #333333;
    span{
      margin-right: .15rem;
    }
    input{
      font-size: .7rem;
      line-height: .98rem;
      border: none;
      width: 70%;
    }
    input::-webkit-input-placeholder {
      font-size: .36rem;
      color: #aab2bd;
       }

    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      font-size: .36rem;
      color: #aab2bd;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      font-size: .36rem;
      color: #aab2bd;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      font-size: .36rem;
      color: #aab2bd;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      font-size: .36rem;
      color: #aab2bd;
    }

    img{
      width: 0.42rem;
      height: 0.42rem;
    }
  }
}
  .ctitle{
    font-size: .26rem;
    line-height: .36rem;
    color: #7B7B7B;
    margin-bottom: .26rem;
  }
  .sureBtn{
    font-size: .36rem;
    line-height: .9rem;
    width: 6.86rem;
    margin: 0 auto;
    background-color: #2F81FF;
    text-align: center;
    color: #fff;
    margin-top: 1.2rem;
    border-radius: 0.08rem;
  }
  .popup_content{
    position: relative;
    padding:.36rem 0 .8rem;
    color: #333333;
    h4{
      font-size: .36rem;
      line-height: .5rem;
      font-weight: 500;
      padding-bottom:.38rem;
      text-align: center;
      border-bottom: 1px solid #D8D8D8;
    }
    & > img{
      position: absolute;
      top: .44rem;
      left: .36rem;
      width: .3rem;
      height: .3rem;
    }
    & > .addCard{
      position: absolute;
      font-size: .28rem;
      line-height: .4rem;
      top: .38rem;
      right: .36rem;
      color: #2F81FF;
    }
    .list{
      padding:0 .35rem ;
      max-height: 6rem;
      min-height: 4rem;
      overflow-y: auto;
      .itemC{
        font-size: .32rem;
        padding: .2rem .28rem .14rem .22rem;
        border-bottom: 1px solid #D8D8D8;
        position: relative;
        margin-bottom: .2rem;
        & > img.chose{
          position: absolute;
          width: .24rem;
          height: .24rem;
          top: 50%;
          margin-top: -0.12rem;
          right: .28rem;
        }
        .icon_i{
          width: .48rem;
          height: .48rem;
          margin-right: .26rem;
        }
        p:first-child{
          color: #3B3B3B;
          line-height: .44rem;
          margin-bottom: .08rem;
        }
        p:last-child{
          line-height: .42rem;
          color: #999999;
        }
      }
    }
  }
  .showCodePupo{
    margin-top: -2rem;
  }
  .showCode{
    width: 5.28rem;
    background-color: #ffffff;
    text-align: center;
    border-radius: .08rem;
    padding: .48rem .6rem .36rem;
    position: relative;
    overflow: hidden;
    .van-password-input{
      background-color: #fff;
      z-index: 22;
    }
    & > img{
      position: absolute;
      top: .32rem;
      right: .32rem;
      width: .3rem;
      height: .3rem;
    }
    p:first-child{
      font-size: .32rem;
      line-height: .44rem;
      margin-bottom: .36rem;
      color: #333;
    }
   & > p:nth-child(2){
      font-size: .28rem;
      line-height: .46rem;
      padding: 0 .24rem;
      margin-bottom: .28rem;
    }
    .van-password-input{
      margin: 0;
    }
    .van-password-input__security{
      height: .7rem;
    }
    .van-password-input__security li{
      line-height: .7rem;
    }
    .codeBtn{
      font-size: .36rem;
      color: #fff;
      line-height: .9rem;
      margin-top: .32rem;
      background-color: #2F81FF;
      border-radius: .08rem;
    }
    .active{
      opacity: .6;
    }
    input{
      display: block;
      font-size: .42rem;
      border: none;
      height: 0.6rem;
      line-height: .6rem;
      border-bottom: 1px solid #979797;
      text-align: center;
      width: 60%;
      margin: 0 auto;
    }
  }
  .showResult{
    padding: .48rem .6rem .36rem;
    width: 5.28rem;
    text-align: center;
    border-radius: .08rem;
    & >img {
      display: block;
      width: .92rem;
      height: .92rem;
      margin: 0 auto .36rem;
    }
    p:nth-child(2){
      font-size: .34rem;
      line-height: .48rem;
      margin-bottom: .18rem;
      color: #333;
    }
    p:nth-child(3){
      font-size: .28rem;
      line-height: .40rem;
      margin-bottom: .28rem;
      color: #777777;
    }
    div:last-child{
      font-size: .36rem;
      color: #fff;
      line-height: .9rem;
      margin-top: .32rem;
      background-color: #2F81FF;
      border-radius: .08rem;
    }
  }
</style>
