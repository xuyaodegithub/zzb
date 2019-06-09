<template>
<!--  我的贷款详情-->
<div class="detail">
    <div class="detail-top">
      <div :style="style" class=" flex a-i">
        <img :src="iconTop" alt="">
        {{orderstatusMatch[orderInfo.orderStatus]}} <span v-if="['6','10'].indexOf(orderInfo.orderStatus)>-1">已还{{orderInfo.repaidAmount}}</span>
      </div>
    </div>
    <div class="d-center" v-if="['1','2','4'].indexOf(orderInfo.orderStatus)>-1">
      <img :src="centerIcon" alt="">
      <p>{{orderInfo.orderStatus | statusText}}</p>
    </div>
    <div class="type3" v-else>
        <p>应还金额</p>
        <h4>{{orderInfo.paybackAmount}}</h4>
      <p v-if="+orderInfo.overdueDay">距还款日{{orderInfo.repayDate}}<span style="color: #ed4630;">已逾期{{orderInfo.overdueDay}}天</span></p>
      <p v-else-if="!orderInfo.overdueDay && orderInfo.deadline==0">今日就是还款日</span></p>
      <p v-else-if="['7','8'].indexOf(orderInfo.orderStatus)>-1">已还款</span></p>
      <p v-else>距还款日{{orderInfo.repayDate}}<span>还剩{{orderInfo.deadline}}天</span></p>
    </div>
    <div class="d-bottom">
        <p class="flex a-i j-b"><span>订单号</span><span>{{orderInfo.orderNo}}</span></p>
        <div>
          <p class="flex a-i j-b"><span>申请日期</span><span>{{orderInfo.applyTime}}</span></p>
          <p class="flex a-i j-b" v-if="orderInfo.repayDate"><span>还款日期</span><span>{{orderInfo.repayDate}}</span></p>
        </div>
        <p class="flex a-i j-b"><span>借款金额</span><span>{{orderInfo.loanAmount}}元</span></p>
        <p class="flex a-i j-b"><span>服务费</span><span>{{orderInfo.serviceFee}}元</span></p>
        <p class="flex a-i j-b"><span>应还金额</span><span>{{orderInfo.paybackAmount}}元</span></p>
        <p class="flex a-i j-b"><span>借款期限</span><span>{{orderInfo.loanPeriod}}天</span></p>
    </div>
   <div class="flex a-i j-b last">
     <span>到账银行卡</span>
     <span>{{orderInfo.backAccount}}</span>
   </div>
  <div class="payBtn flex a-i" v-if="['5','9'].indexOf(orderInfo.orderStatus)>-1">
      <div @click="repay()">立即还款</div>
      <div>我要延期</div>
  </div>
</div>
</template>

<script>
  import back from '@/assets/image/detailB.png'
  import one from '@/assets/image/one.png'
  import one1 from '@/assets/image/one1.png'
  import two from '@/assets/image/two.png'
  import two1 from '@/assets/image/two2.png'
  import three from '@/assets/image/three.png'
  import four from '@/assets/image/four.png'
  import four1 from '@/assets/image/four1.png'
  import overOrder from '@/assets/image/overOrder.png'
  import { orderstatusMatch } from '@/utils/match';
  // import { Row, Col, PasswordInput, NumberKeyboard, Popup, Dialog, Toast, Icon, Button } from 'vant';
  import { getOrderInfo, loanPostpone } from '@/apis/index';
  import { getStore } from '@/utils/storage.js';
    export default {
        name: "detail",
      data(){
          return {
            style:{
              backgroundImage:`url(${back})`
            },
            orderstatusMatch,
            failVisi:'',
            orderInfo: '',

          }
      },
      components:{

      },
      mounted(){
        this.fetchLoanInfo()
      },
      computed:{
        iconTop(){
          if(this.orderInfo.orderStatus==1) return one;//申请中
          else if(this.orderInfo.orderStatus==4 || this.orderInfo.orderStatus==2) return two;//等待放款//等待审核
          else if(this.orderInfo.orderStatus==5 || this.orderInfo.orderStatus==9) return three;//等待还款
          else if(this.orderInfo.orderStatus==7 || this.orderInfo.orderStatus==8) return overOrder;//已还款
          else if(this.orderInfo.orderStatus==3 || this.orderInfo.orderStatus==12) return four;//等待还款
        },
        centerIcon(){
          if(this.orderInfo.orderStatus==1) return one1;
          else if(this.orderInfo.orderStatus==4 || this.orderInfo.orderStatus==2) return two1;//等待放款//等待审核
          else if(this.orderInfo.orderStatus==3 || this.orderInfo.orderStatus==12) return four1;//审核失败
          // else if(this.loanList.type==3) return three
        },
        orderNo () {
          return this.$route.query.orderId;
        },
        phoneNum () {
          return getStore('phoneNum');
        }
      },
      methods:{
        // 贷款订单信息
        fetchLoanInfo () {
          getOrderInfo(this.orderNo).then(res=>{
            if (!res.resultCode) {
              this.orderInfo = res.data;
              this.failVisi = res.data.orderStatus === 3;
            }
          });
        },
        repay(){
          this.$router.push(`/repayment?orderId=${orderInfo.orderNo}&paybackAmount=${orderInfo.paybackAmount}`)
        }
      },
    }
</script>

<style scoped lang="scss">
.detail-top{
  padding: .14rem .32rem .28rem;
  font-size: .3rem;
  line-height: .44rem;
  color: #4B4B4B;
  margin-bottom: .22rem;
  background-color: #2F81FF;
  & > div{
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    line-height: 1rem;
    padding-left: .3rem;
  }
  img{
    width: .46rem;
    height: .46rem;
    margin-right: .24rem;
  }
}
  .d-center{
    padding: .84rem 0 .66rem;
    font-size: .24rem;
    color: #333333;
    text-align: center;
    img{
      display: block;
      width: .8rem;
      height: .8rem;
      margin: 0 auto;
      margin-bottom: .5rem;
    }
  }
.d-center,.type3{
  background-color: #ffffff;
}
  .type3{
    padding: .22rem 0 1.08rem;
    text-align: center;
    font-size: .3rem;
    line-height: .44rem;
    h4{
      font-size: .7rem;
      line-height: 1rem;
      color: #222222;
      margin-bottom: 0.06rem;
      font-weight: 500;
    }
    p:last-child{
      color: #2690FF;
    }
    .delay{
      color:#ed4630;
    }
  }
  .d-bottom{
    font-size: .26rem;
    color:#7B7B7B;
    padding: 0 .32rem .2rem;
    line-height: .60rem;
    background-color: #ffffff;
    margin-bottom: .22rem;
    div:nth-child(2){
      margin-bottom:.2rem ;
      padding-bottom: .2rem;
      border-bottom: 1px solid #EEEEEE;
    }

  }
  .last{
    padding: 0 .32rem;
    font-size:.26rem ;
    color: #7B7B7B;
    line-height: 1.04rem;
    background-color: #ffffff;
  }
  .payBtn{
    padding: .28rem .8rem;
    justify-content: center;
    font-size: .34rem;
    line-height: .8rem;
    text-align: center;
    color: #fff;
    div{
      width: 2.6rem;
      border-radius: 0.04rem;
    }
    div:first-child{
      background-color: #2F81FF;
      margin-right: .7rem;
    }
    div:last-child{
      background-color: #C3C4C3;
    }
  }
</style>
