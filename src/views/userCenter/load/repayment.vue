<template>
  <!--  还款界面-->
  <div class="repayment">
    <div class="flex a-i j-b bank">
      <div class="flex a-i">
        <img :src="bank" alt="">
        建设银行(**** 5419)
      </div>
      <img src="../../../assets/image/bankRight.png" alt="">
    </div>
    <div>
      <p class="ctitle">
        应还金额（300.00元）
      </p>
      <div class="flex a-i inputDom">
        <span>CNY</span>
        <input type="number" v-model="moneyNum" placeholder="请输入还款金额">
        <img src="../../../assets/image/clear.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import jsbank from '@/assets/image/jsbank.png'

  export default {
    name: "repayment",
    data() {
      return {
        moneyNum:''
      }
    },
    components: {},
    mounted() {
    },
    computed: {
      bank() {
        return jsbank
      }
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
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
</style>
