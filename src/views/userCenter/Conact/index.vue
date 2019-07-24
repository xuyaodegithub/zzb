<template>
<!--  联系客服-->
 <div class="cancat">
    <h4>联系方式和工作时间:</h4>
   <div>客服QQ：3504473917<span></span></div>
    <p>人工服务时间：09:00--22:00</p>
 </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
  .cancat{
    font-size: .28rem;
    padding: .9rem .6rem 0;
    color: #000;
    & > div {
      text-indent: 1em;
      margin-bottom: .3rem;
      margin-top: .6rem;
      color: #979797;
      span{
        font-size: .32rem;
      }
    }
    p{
      text-indent: 1em;
      font-size: .28rem;
      color: #979797;
      line-height: .4rem;
    }

  }
  h4{
    font-size: .32rem;
    font-weight: 400;
    margin-bottom: .2rem;
  }
</style>
