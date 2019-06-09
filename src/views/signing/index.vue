<template>
<!--签约-->
  <div class="singing">
    <div :style="style" class="singBack">
      <h3>签约</h3>
      <p class="Tips flex a-i">
        <img src="../../assets/image/tishi.png" alt="">
        请确认您的借款金额后签约</p>
      <div>
        <van-cell-group>
          <van-cell title="借款金额" :value="productInfo.loanAmount" />
          <van-cell title="服务费" :value="productInfo.serviceFee" />
          <van-cell title="还款金额" :value="productInfo.loanAmount" />
          <van-cell title="借款期限" :value="productInfo.loanPeriod" />
          <van-cell title="申请日期" :value="productInfo.applyTime" />
        </van-cell-group>
      </div>
    </div>

    <div class="check">
        <van-checkbox class="flex" v-model="agreementArr[0]">本人承诺已认真阅读并将遵守 <span @click.stop="serverOne(0)">《本金借款协议》</span> <span @click.stop="serverOne(1)">《贷款用户确认书》</span></van-checkbox>
        <van-checkbox v-model="agreementArr[1]">本人同意平台获取第三方征信数据</van-checkbox>
      </div>
      <div class="btn-sing">
        <div class="btn" @click="fetchLoanPerform" :class="{'canActive' : agreementArr.indexOf(false)>-1}">签约</div>
        <span class="cancal" @click="cancelFn">取消订单</span>
      </div>
  </div>
</template>

<script>
  import { Cell, CellGroup, Checkbox, Toast, Dialog } from 'vant';
  import { loanPerform, loanPostDetail } from '@/apis/index';
  import { getStore } from '@/utils/storage';
  import sing from '@/assets/image/sing.png'
    export default {
        name: "index",
      data(){
          return {
            style:{
              backgroundImage:`url(${sing})`
            },
            productInfo: {
              loanAmount: '',
              totalRepayAmt: '',
              serviceFee: '',
              loanPeriod: '',
              applyTime: ''
            },
            agreementInfo:[],
            agreementArr:[false,false]
          }
      },
      components:{
          [Cell.name]:Cell,
          [CellGroup.name]:CellGroup,
          [Checkbox.name]:Checkbox,
          [Toast.name]:Toast,
          [Dialog.name]:Dialog,
      },
      mounted(){
          this.fetchLoanPostDetail()
      },
      computed:{
        productId () {
          return getStore('productId');
        },
        agreementTempId () {
          let agree = this.agreementInfo;
          let _arr = [];
          agree.map(item => {
            _arr.push(item.id);
          });
          return _arr;
        },
        loanPurpose () {//借款用途
          // return getStore('loanPurpose');
          return this.$route.query.usePurposeId
        },
        uninque () {// 现在时间戳
          return new Date().getTime();
        }
      },
      methods:{
        fetchLoanPostDetail () {
          loanPostDetail(this.productId).then(res=>{
            if (!res.resultCode) {
              this.agreementInfo = res.data.agreements;
              this.productInfo = res.data;
            }
          });
        },
        fetchLoanPerform () {
          if (!this.productInfo.loanAmount) {
            Toast('未获取贷款信息，无法签约');
            return;
          }
          if (!this.agreementArr[0]) {
            Toast('请认真阅读并同意签约协议');
            return;
          }
          if (!this.agreementArr[1]) {
            Toast('请勾选同意平台获取第三方征信数据');
            return;
          }
          // this.alreadyClick = true;
          Toast.loading({
            mask: true,
            message: '签约中...',
            duration:0
          });
          loanPerform(this.agreementTempId, this.productId, this.loanPurpose, this.uninque).then(res=>{
            Toast.clear()
            if (!res.resultCode) {
              // this.orderNo = res.data.orderNo;
              this.$router.replace(`/loadDetail?orderId=${res.data.orderNo}`);
              // this.alreadyClick = false;
            } else {
              // this.alreadyClick = false;
              Toast(`${res.resultMessage}`);
            }
          }).catch(err=>{
            console.log(err)
            Toast.clear()
          });
        },
        cancelFn () {
          Dialog.confirm({
            message: '您是否要取消订单？',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.$router.replace('/home');
          }).catch(() => {
          });
        },
        serverOne(index){
          console.log(index)
          this.$store.commit('SETS_ERVER',this.agreementInfo[index])
          this.$router.push(`/serviceAgreement?type=2`)
        }
      }
    }
</script>

<style scoped lang="scss">
  $back:#2F81FF;
.singing{
  color: #333;
  padding: .4rem .32rem 0;
  .singBack{
    padding: .4rem;
    background-size: cover;
  }
  h3{
    margin-bottom: .48rem;
    color: #fff;
    font-weight: 600;
    font-size: .48rem;
    line-height: .66rem;
  }
  .Tips{
    font-size: .24rem;
    line-height: .34rem;
    color: #EAEAEA;
    margin-bottom: .34rem;
    img{
      width: .36rem;
      height: .36rem;
      margin-right: .12rem;
    }
  }
  .check{
    padding:0.32rem;
    font-size: .26rem;
    color: #3B3B3B;
    line-height: .42rem;
    .van-checkbox{
      margin-bottom: .16rem;
    }
    span{
      color: $back;
    }
  }
  .btn-sing{
    padding: 0.18rem 0 0;
    color: #fff;
    font-size: .36rem;
    text-align: center;
    .btn{
      border-radius: 0.08rem;
      background-color: $back;
      margin-bottom: .34rem;
      line-height: .9rem;
    }
    .canActive{
      opacity: .6;
    }
  }
  .cancal{
    font-size: .3rem;
    color: #999999;
  }

}
</style>
<style>
  .singBack .van-cell, .singBack .van-cell-group,.singBack .van-cell__value{
    background-color: rgba(0,0,0,0);
    color: #EAEAEA;
  }

  .singBack [class*=van-hairline]::after{
    border: none;
  }
</style>
