<template>
<!--  我的贷款详情-->
<div class="detail">
    <div class="detail-top">
      <div :style="style" class=" flex a-i">
        <img :src="iconTop" alt="">
        {{loanList.type | statusChange}}
      </div>
    </div>
    <div class="d-center" v-if="loanList.type!=3">
      <img :src="centerIcon" alt="">
      <p>{{loanList.type | statusText}}</p>
    </div>
    <div class="type3" v-else>
        <p>应还金额</p>
        <h4>2000.00</h4>
        <p>距还款日2019-05-23<span :class="{'delay' : Date.now()<loanList.backData}">还剩2天</span></p>
    </div>
    <div class="d-bottom">
        <p class="flex a-i j-b"><span>订单号</span><span>{{loanList.orderNum}}</span></p>
        <div>
          <p class="flex a-i j-b"><span>申请日期</span><span>{{loanList.updata}}</span></p>
          <p class="flex a-i j-b" v-if="loanList.type==3"><span>还款日期</span><span>{{loanList.backData}}</span></p>
        </div>
        <p class="flex a-i j-b"><span>借款金额</span><span>{{loanList.enmemoy}}元</span></p>
        <p class="flex a-i j-b"><span>服务费</span><span>{{loanList.serverPay}}元</span></p>
        <p class="flex a-i j-b"><span>应还金额</span><span>{{loanList.backmoney}}元</span></p>
        <p class="flex a-i j-b"><span>借款期限</span><span>{{loanList.deyDay}}天</span></p>
    </div>
   <div class="flex a-i j-b last">
     <span>到账银行卡</span>
     <span>{{loanList.cardNo}}</span>
   </div>
  <div class="payBtn flex a-i" v-if="loanList.type==3">
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
    export default {
        name: "detail",
      data(){
          return {
            style:{
              backgroundImage:`url(${back})`
            },
            loanList: {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',backData:'2019-05-26',type:3,serverPay:1,cardNo:'41596449641964196489'},

          }
      },
      components:{

      },
      mounted(){

      },
      computed:{
        iconTop(){
          if(this.loanList.type==1) return one;
          else if(this.loanList.type==2) return two;
          else if(this.loanList.type==3) return three;
        },
        centerIcon(){
          if(this.loanList.type==1) return one1;
          else if(this.loanList.type==2) return two1;
          // else if(this.loanList.type==3) return three
        }
      },
      methods:{
        repay(){
          this.$router.push('/repayment')
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
