<template>
<!--  联系客服-->
 <div class="cancat">
    <h4>在线客服</h4>
   <div>QQ：<span></span></div>
    <p>
      如果你在使用分期淘的过程中有任何疑问，请联系此QQ客服人员，我们会尽快解答您的疑问！
    </p>
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
      margin-bottom: .3rem;
      span{
        font-size: .32rem;
      }
    }
    p{
      font-size: .24rem;
      color: #979797;
      line-height: .4rem;
    }
  }
  h4{
    font-weight: 400;
    margin-bottom: .2rem;
  }
</style>
