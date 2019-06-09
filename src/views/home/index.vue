<template>
  <section>
    <!--<header-sub></header-sub>-->
    <div class="download flex a-i">
      <div>分期淘</div>
      <p>分期淘 您的首选贷款平台</p>
      <div class="btnLogo">下载</div>
      <img src="../../assets/image/close.png" alt="">
    </div>
    <div class="top" :style="style">
      <p class="title">借款金额(元)</p>
      <p class="num">{{currentProduct.loanAmount}}</p>
      <div class="flex a-i">
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
      <div class="mess">
        <img src="../../assets/image/mess.png" alt="">
        1小时放款，申请门槛低，零利息.
      </div>
    </div>
    <div class="pList">
      <p><span>|</span>选择金融产品</p>
      <div class="flex a-i f-w">
        <div v-for="(item,index) in loanproductList" :key="index" :style="selectindex==index ? style2 : {}"
             @click="selectItem(item,index)">
          <p>{{item.loanAmount | twozero}}</p>
          <p>{{item.deadLine}}</p>
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
  import headerSub from '@/components/header/index'
  import footerSub from '@/components/footer/index'
  import back from '../../assets/image/indexback.png'
  import select from '../../assets/image/select.png'
  import {getUserInfo, getProductList} from '@/apis/index';
  import {setStore} from '@/utils/storage.js';
  import {Dialog} from 'vant';

  export default {
    name: "index",
    data() {
      return {
        style: {
          backgroundImage: `url(${back})`,
        },
        style2: {
          backgroundImage: `url(${select})`,
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
      headerSub, footerSub, [Dialog.name]: Dialog
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
        this.$router.push('/selfAuthentication');
        // let canApply = [0, 4].includes(this.loanOrderStatus); // 可以申请
        // let waitExam = [1, 2].includes(this.loanOrderStatus); // 等待审核
        // if (canApply) {
        //   setStore('productId', this.currentProduct.productId);
        //   if (this.authStatus !== '0') {
        //     this.$router.push('/personInfo');
        //   } else {
        //     // this.$router.push({name: 'ID', query: {productId: this.currentProduct.productId}});
        //     // this.$router.push(`/ocrCard?productId=${this.currentProduct.productId}`);
        //     this.$router.push(`/selfAuthentication`);
        //   }
        //   return;
        // }
        // if (waitExam) {
        //   Dialog.alert({
        //     message: '您已申请借款,请耐心等待!',
        //     confirmButtonColor:'#2F81FF'
        //   }).then(() => {
        //     this.$router.push('/load');
        //   });
        //   return;
        // }
        // if (this.loanOrderStatus === 3) {
        //   Dialog.confirm({
        //     message: '您还有未还款的订单，请先还款之后，再次申请借款。',
        //     confirmButtonText: '去还款',
        //     cancelButtonText: '我知道了',
        //     confirmButtonColor:'#2F81FF'
        //   }).then(() => {
        //     this.$router.push('/load');
        //   }).catch(() => {
        //   });
        // }
      },
    },
  }
</script>

<style scoped lang="scss">
  $back: #F6F6F6;
  $fs: #2F81FF;
  section {
    /*min-height: 100%;*/
    background-color: $back;
    color: #ffffff;
    padding-bottom: 1.5rem;
  .download{
    padding: .16rem .3rem;
    background-color: #3A383B;
    font-size: .28rem;
    color: #fff;
    text-align: center;
    & div:first-child{
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
    }
    & > img{
      width: .24rem;
      height: .24rem;
      border: 1px solid #fff;
    }
  }
    .top {
      padding: 0.62rem 0.32rem 0.28rem;
      background-position: center;
      background-size: cover;
      margin-bottom: 0.4rem;

      .title {
        font-size: 0.28rem;
        line-height: 0.4rem;
      }

      .num {
        font-size: 0.64rem;
        line-height: 0.9rem;
        margin-bottom: 0.3rem;
      }

      .flex {
        margin-bottom: 0.8rem;
        font-size: 0.28rem;
        line-height: 0.4rem;

        & > div {
          margin-right: 0.7rem;
        }

        p:first-child {
          color: #E4E1E1;
          margin-bottom: 0.08rem;
        }

        p:last-child {
          font-size: 0.36rem;
          line-height: 0.5rem;
        }
      }

      .mess {
        font-size: 0.28rem;
        color: #F1EEEE;

        img {
          display: inline-block;
          vertical-align: middle;
          width: 0.36rem;
          height: 0.36rem;
          margin-right: 0.2rem;
        }
      }
    }

    .pList {
      font-size: 0.28rem;
      background-color: #ffffff;
      padding: 0 0.32rem 0.8rem 0.32rem;
      margin-bottom: 0.54rem;

      & > p {
        line-height: 0.7rem;
        color: #333333;
        border-bottom: 1px solid #E5E5E5;
        margin-bottom: 0.26rem;

        span {
          color: $fs;
          font-weight: 800;
          margin-right: 0.12rem;
        }
      }

      .flex {
        font-size: 0.3rem;
        color: $fs;
        text-align: center;

        & > div {
          width: 2.1rem;
          padding: 0.4rem 0 0.26rem 0;
          border: 1px solid $fs;
          border-radius: 0.1rem;
          margin-right: 0.28rem;
          margin-bottom: 0.28rem;
          background-position: center;
          background-size: cover;

          &:nth-child(3n) {
            margin-right: 0;
          }

          p:first-child {
            margin-bottom: 0.16rem;
          }

          p:last-child {
            font-size: 0.24rem;
          }
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
