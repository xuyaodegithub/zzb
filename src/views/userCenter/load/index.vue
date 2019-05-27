<template>
<!--  我的贷款列表-->
  <div class="myDlist">
    <div v-for="(val,index) in list" :key="index" class="item">
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
  import headerSub from '@/components/header/index'
  import footerSub from '@/components/footer/index'
    export default {
        name: "myDlist",
      data(){
          return {
            list:[
              {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',type:1},
              {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',type:1},
              {orderNum:'12345678910121',enmemoy:500,backmoney:501,deyDay:7,updata:'2019-05-26',type:1},
            ]
          }
      },
      components:{
        headerSub,footerSub
      },
      mounted(){},
      computed:{},
      methods:{},
    }
</script>

<style scoped lang="scss">
.myDlist{
  margin-top: 0.22rem;
  background-color: #ffffff;
  padding: 0 .32rem 0;
  color: #3B3B3B;
  font-size: .28rem;
  .item{
    margin-bottom: .24rem;
  }
  .clear{
    line-height: .6rem;
    border-bottom: 1px solid #D8D8D8;
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
    color: #777777;
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
    color: #777;
  }
}
</style>
