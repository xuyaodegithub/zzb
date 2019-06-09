<template>
<!--  我的贷款列表-->
  <div class="myDlist">
    <div class="noitem" v-if="loanList.length<1">
      暂无数据...
    </div>
    <div v-for="(val,index) in loanList" :key="index" class="item" v-else @click="goDetail(val)" :style="style">
      <p class="clear">
        <span>订单号：</span><span>{{val.orderNo}}</span><span>{{orderstatusMatch[val.orderStatus]}}</span>
      </p>
      <div class="flex a-i j-b cellCard">
        <div>
          <p>到账金额(元)</p>
          <p>{{val.receivedAmount}}</p>
        </div>
        <div>
          <p>应还金额(元)</p>
          <p>{{val.paybackAmount}}</p>
        </div>
        <div>
          <p>借款期限(天)</p>
          <p>{{val.loanPeriod}}天</p>
        </div>
      </div>
      <div class="data flex j-b a-i">
        <div>
          <p>申请日期：{{val.applyTime}}</p>
          <p v-if="val.repayDate">还款日期：{{val.repayDate}}</p>
          <p v-if="val.actualTime">实际还款日期：{{val.actualTime}}</p>
        </div>
        <div class="btn" @click.stop="getLoanDetail(val,orderNo,val.paybackAmount)" v-if="isShowRepay(val.orderStatus)">
          立即还款
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { orderstatusMatch } from '@/utils/match';
  import { getLoanList } from '@/apis/index';
  import backI from '@/assets/image/Rectangle.png'
    export default {
        name: "myDlist",
      data(){
          return {
            orderstatusMatch,
            style:{
              backgroundImage:`url(${backI})`
            },
            loanList:[
              // {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',type:1},
              // {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',type:2},
              // {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',type:3},
              // {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',type:4},
            ]
          }
      },
      components:{

      },
      mounted(){
          this.fetchLoanInfo()
      },
      computed:{},
      methods:{
        // 获取贷款列表
         fetchLoanInfo () {
           getLoanList().then(res=>{
             if (!res.resultCode) {
               this.loanList = res.data;
             } else {
               Toast(`${res.resultMessage}`);
             }
           });
        },
        goDetail(item){//去详情
           this.$router.push(`loadDetail?orderId=${item.orderNo}`)
        },
        // 展示 立即还款按钮
        isShowRepay (num) {
          let whiteList = ['5', '6', '9', '10', '11'];
          return whiteList.includes(num);
        },
        getLoanDetail (orderNo, paybackAmount) {//还款
          this.$router.push(`/repayment?orderId=${orderNo}&paybackAmount=${paybackAmount}`);
          // this.$router.push({path: '', params: {orderId: orderNo, paybackAmount: paybackAmount}});
        }
      },
    }
</script>

<style scoped lang="scss">
  .noitem{
    text-align: center;
    padding: 1rem 0;
    color: #777777;
  }
.myDlist{
  color: #3B3B3B;
  font-size: .28rem;
  padding: .22rem .32rem 0;
  .item{
    border-radius: 0.25rem;
    margin-bottom: .24rem;
    /*background-color: #ffffff;*/
    padding: 0 .32rem 0;
    /*background-position: center;*/
    background-size: cover;
    background-repeat: no-repeat;
    /*overflow: hidden;*/
  }
  .clear{
    line-height: .6rem;
    border-bottom: 1px solid rgba(255,255,255,.2);
    color: #fff;
    span{
      display: inline-block;
    }
    span:last-child{
      color: #EA2424;
      float: right;
    }
  }
  .cellCard.flex{
    padding: .22rem .24rem .12rem;
    color: rgba(255,255,255,.6);
    line-height: .36rem;
    font-size: .26rem;
    border-bottom: 1px solid rgba(255,255,255,.2);
    p:first-child{
      margin-bottom: 0.04rem;
    }
    p:last-child{
      text-align: center;
      font-size: .28rem;
      line-height: 0.6rem;
    }
  }
  .data{
    font-size: .26rem;
    /*line-height: .84rem;*/
    padding: .24rem .24rem 0.3rem;
    line-height: .36rem;
    color: rgba(255,255,255,.6);
    p:first-child{
      margin-bottom: 0.04rem;
    }
    .btn{
      color: #2F81FF;
      text-align: center;
      background-color: #fff;
      line-height: .5rem;
      width: 1.28rem;
      border-radius: 0.06rem;
    }
  }
}
</style>
