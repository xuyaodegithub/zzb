<template>
<!--  我的贷款列表-->
  <div class="myDlist">
    <div class="noitem" v-if="loanList.length<1">
      暂无数据...
    </div>
    <div v-for="(val,index) in loanList" :key="index" class="item" v-else @click="goDetail(val)" :style="style">
      <p class="clear">
        <span>订单号：</span><span>{{val.orderNum}}</span><span>申请中</span>
      </p>
      <div class="flex a-i j-b">
        <div>
          <p>到账金额(元)</p>
          <p>{{val.enmemoy}}</p>
        </div>
        <div>
          <p>应还金额(元)</p>
          <p>{{val.backmoney}}</p>
        </div>
        <div>
          <p>借款期限(天)</p>
          <p>{{val.updata}}</p>
        </div>
      </div>
      <div class="data">
        申请日期：{{val.updata}}
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
            style:{
              backgroundImage:`url(${backI})`
            },
            loanList:[
              {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',type:1},
              {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',type:1},
              {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',type:1},
            ]
          }
      },
      components:{

      },
      mounted(){
          // this.fetchLoanInfo()
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
          this.$router.push({name: 'Repayment', params: {orderId: orderNo, paybackAmount: paybackAmount}});
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
  margin-top: 0.22rem;
  /*background-color: #ffffff;*/
  color: #3B3B3B;
  font-size: .28rem;
  .item{
    margin-bottom: .24rem;
    background-color: #ffffff;
    padding: 0 .32rem 0;
    background-size: cover;
  }
  .clear{
    line-height: .8rem;
    border-bottom: 1px solid #D8D8D8;
    color: #fff;
    span{
      display: inline-block;
    }
    span:last-child{
      color: #EA2424;
      float: right;
    }
  }
  .flex{
    padding: .20rem 0;
    color: rgba(255,255,255,.6);
    font-size: .26rem;
    border-bottom: 1px solid #D8D8D8;
    p:first-child{
      margin-bottom: 0.2rem;
    }
    p:last-child{
      text-align: center;
      font-size: .28rem;
      line-height: 0.48rem;
    }
  }
  .data{
    font-size: .26rem;
    line-height: .84rem;
    color: rgba(255,255,255,.6);
  }
}
</style>
