<template>
  <section>
    <!--<header-sub></header-sub>-->
    <div class="download flex a-i" v-if="$store.state.page.appOrh5!=='app' && !showLoad">
      <div>分期淘</div>
      <p>分期淘 您的首选贷款平台</p>
        <div class="btnLogo" @click="$router.push('/downLoad')">下载</div>
      <img src="../../assets/image/close.png" alt=""  @click="showLoad=true">
    </div>
    <!--<div class="top" :style="style">-->
      <!--<p class="title">借款金额(元)</p>-->
      <!--<p class="num">{{currentProduct.loanAmount}}</p>-->
      <!--<div class="flex a-i">-->
        <!--<div>-->
          <!--<p>应还金额(元)</p>-->
          <!--<p>{{currentProduct.payAmount}}</p>-->
        <!--</div>-->
        <!--<div>-->
          <!--<p>服务费(元)</p>-->
          <!--<p>{{currentProduct.fee}}</p>-->
        <!--</div>-->
        <!--<div>-->
          <!--<p>借款期限(天)</p>-->
          <!--<p>{{currentProduct.deadLine}}</p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="mess">-->
        <!--<img src="../../assets/image/mess.png" alt="">-->
        <!--1小时放款，申请门槛低，零利息.-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="pList">-->
      <!--<p><span>|</span>选择金融产品</p>-->
      <!--<div class="flex a-i f-w">-->
        <!--<div v-for="(item,index) in loanproductList" :key="index" :style="selectindex==index ? style2 : {}"-->
             <!--@click="selectItem(item,index)">-->
          <!--<p>{{item.loanAmount | twozero}}</p>-->
          <!--<p>{{item.deadLine}}</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="home">
      <img src="../../assets/image/homeback.png" alt="">
    </div>
    <div class="content">
        <div class="flex a-i j-b top">
           <div>
              <img src="../../assets/image/shx.png" alt="">
              <p>快速授信</p>
           </div>
          <div>
            <img src="../../assets/image/shh.png" alt="" class="small">
            <p>急速审核</p>
          </div>
          <div>
            <img src="../../assets/image/huank.png" alt="">
            <p>还款灵活</p>
          </div>
        </div>
        <div class="crilce" :style="style">
            <p>借款金额</p>
            <h4>{{currentProduct.loanAmount}}</h4>
        </div>
        <div class="flex a-i j-b bottom">
          <div>
            <p>应还金额(元)</p>
            <p>{{currentProduct.payAmount}}</p>
          </div>
          <div>
            <p>服务费(元)</p>
            <p>{{currentProduct.fee}}</p>
          </div>
          <div>
            <p>借款期限(天)</p>
            <p>{{currentProduct.deadLine}}</p>
          </div>
        </div>
    </div>
    <div class="btn-p">
      <div class="btn" @click="applyLoan()">申请借款</div>
    </div>
    <!--<footer-sub></footer-sub>-->
  </section>
</template>

<script>
  import backTwo from '../../assets/image/homeback2.png'
  import {getUserInfo, getProductList} from '@/apis/index';
  import {setStore} from '@/utils/storage.js';
  import {Dialog} from 'vant';

  export default {
    name: "index",
    data() {
      return {
        showLoad:false,
        style: {
          backgroundImage: `url(${backTwo})`,
        },
        selectindex: 0,
        hasaArrears: false, // 是否有欠款
        authStatus: '0',
        loanproductList: [],
        currentProduct: {}, // 展示的产品信息
        loanOrderStatus: '', // 存在未还的订单 不允许申请
        checkList: []
      }
    },
    components: {
      [Dialog.name]: Dialog
    },
    mounted() {
      this.getUserInfo()
      this.fetchProductList()
    },
    computed: {},
    methods: {
      selectItem(item, index) {
        if (!item.available) return;
        this.selectindex = index
        this.currentProduct = item;
      },
      getUserInfo() {//用户信息
        getUserInfo().then(res => {
          if (!res.resultCode) {
            this.authStatus = res.data.authStatus;
            this.$store.commit('AUTHSTATUS', res.data.authStatus);
          }
        })
      },
      fetchProductList() { // 产品列表
        getProductList().then(res => {
          if (!res.resultCode) {
            this.loanOrderStatus = res.data.loanOrderStatus;
            this.loanproductList = res.data.productList;
            this._initCheckList();
          }
        });
      },
      _initCheckList() { // 初始化选中列表 目前选中的对象
        let _list = this.loanproductList;
        _list.map((item, index) => {
          if (item.defaultShow) {
            this.currentProduct = item;
            this.selectindex = index
          }
        });
      },
      applyLoan() {
        // this.$router.push('/repayment');
        let canApply = [0, 4].includes(this.loanOrderStatus); // 可以申请
        let waitExam = [1, 2].includes(this.loanOrderStatus); // 等待审核
        if (canApply) {
          setStore('productId', this.currentProduct.productId);
          if (this.authStatus !== '0') {
            this.$router.push('/personInfo');
          } else {
            // this.$router.push({name: 'ID', query: {productId: this.currentProduct.productId}});
            // this.$router.push(`/ocrCard?productId=${this.currentProduct.productId}`);
            this.$router.push(`/selfAuthentication`);
          }
          return;
        }
        if (waitExam) {
          Dialog.alert({
            message: '您已申请借款,请耐心等待!',
            confirmButtonColor:'#2F81FF'
          }).then(() => {
            this.$router.push('/load');
          });
          return;
        }
        if (this.loanOrderStatus === 3) {
          Dialog.confirm({
            message: '您还有未还款的订单，请先还款之后，再次申请借款。',
            confirmButtonText: '去还款',
            cancelButtonText: '我知道了',
            confirmButtonColor:'#2F81FF'
          }).then(() => {
            this.$router.push('/load');
          }).catch(() => {
          });
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  $back: #F6F6F6;
  $fs: #2F81FF;
  section {
    /*min-height: 100%;*/
    color: #ffffff;
    padding-bottom: 1.5rem;
    background-color: #fff;
  .download{
    padding: .16rem .3rem;
    background-color: #3A383B;
    font-size: .28rem;
    color: #fff;
    text-align: center;
    & > div:first-child{
      width: .88rem;
      line-height: .88rem;
      background-color: $fs;
      margin-right: .24rem;
      font-size: .24rem;
      border-radius: 0.08rem;
    }
    .btnLogo{
      border-radius: 0.08rem;
      margin:0 1rem 0 .42rem;
      line-height: .44rem;
      width: .96rem;
      background-color: $fs;
      color: #fff;
    }
    & > img{
      width: .24rem;
      height: .24rem;
      /*border: 1px solid #fff;*/
    }
  }
   .home{
     height: 3.16rem;
     overflow: hidden;
     img{
       display: block;
       width: 100%;
       position: relative;
       top: -0.9rem;
     }
   }
    .content{
      padding: 0 .58rem;
      background-color: #fff;
      .top{
        font-size: .24rem;
        line-height: .34rem;
        color: #5F5F5F;
        position: relative;
        left: 0;
        top:-0.7rem ;
        border-radius:.06rem;
        box-shadow: 0 0.04rem 0.08rem 0 #E0ECFE;
        background-color: #fff;
        padding: .52rem .6rem .26rem;
        /*margin-bottom: .64rem;*/
        img{
          display: block;
          width: .68rem;
          height: .58rem;
          margin: 0 auto .18rem;
        }
        .small{
          width: .46rem;
          height: .48rem;
        }
      }
      .crilce{
        width: 3.7rem;
        height: 2.9rem;
        margin: 0 auto .5rem;
        background-repeat: no-repeat;
        background-size: cover;
        font-size: .28rem;
        line-height: .4rem;
        color: #333;
        padding: .9rem 1.04rem .56rem;
        text-align: center;
        p{
          margin-bottom: .1rem;
        }
        h4{
          font-size: .64rem;
          line-height: .9rem;
          font-weight: 500;
        }
      }
      .bottom{
        font-size: .28rem;
        line-height: .4rem;
        color: #333;
        text-align: center;
        margin-bottom: .58rem;
        p:first-child{
          color: #979797;
          margin-bottom: .08rem;
        }
        p:last-child{
          font-size: .36rem;
          line-height: .5rem;
        }
      }
    }
    .btn-p {
      padding: 0 0.32rem;

      .btn {
        font-size: 0.36rem;
        line-height: 0.9rem;
        text-align: center;
        color: #ffffff;
        background-color: $fs;
        border-radius: 0.1rem;
      }
    }
  }
</style>
