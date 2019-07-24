<template>
    <div class="downLoad">
      <img src="../../assets/image/top.png" alt="" class="aurora-box-top">
      <a href="https://xmvip.vip/fenqitao">
        <img src="../../assets/image/center.png" alt="">
      </a>
      <div class="said">
        <h4>
          苹果手机安装说明:
        </h4>
        <p>
          1、打开设置-通用-设备管理-企业级应用。
        </p>
        <p>
          2、在企业级应用列表中找到“Hangzhou BI BEI…”点击进入。
        </p>
        <p>
          3、点击“信任Hangzhou BI BEI…” -  在弹出框中点击信任。
        </p>
        <p>
          4、安装完成，APP可以正常使用。
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "downLoad",
      data () {
          return {

          }
      },
      components: {

      },
    }
</script>

<style scoped>
  img{
    display: block;
    width: 100%;
  }
  .said{
    padding: .2rem .3rem;
    background-color: #ffffff;
    padding-top: 0;
  }
  h4{
    font-size: .32rem;
    color: #333;
    line-height: .9rem;
  }
  p {
    font-size: .32rem;
    color: #979797;
    line-height: .6rem;
  }
</style>
