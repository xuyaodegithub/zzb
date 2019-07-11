<template>
<!--  我的-->
<div class="my">
  <div class="download flex a-i" v-if="$store.state.page.appOrh5!=='app' && !showLoad">
    <div>分期淘</div>
    <p>分期淘 您的首选贷款平台</p>
    <div class="btnLogo" @click="$router.push('/downLoad')">下载</div>
    <img src="../../assets/image/close.png" alt=""  @click="showLoad=true">
  </div>
    <div class="userInfo" :style="style">
      <h4>{{userInfo.name}}</h4>
      <p>（{{userInfo.phone}}）</p>
      <!--<div class="tag">-->
        <!--{{userInfo.grade}}-->
      <!--</div>-->
      <div class="flex history j-b a-i">
          <div>
            <p>{{userInfo.repaidAmount}}</p>
            <p>待还金额(元)</p>
          </div>
          <div>
            <p>{{userInfo.loanCount}}</p>
            <p>借款成功数(笔)</p>
          </div>
          <div>
            <p>{{userInfo.overdueCount}}</p>
            <p>逾期笔数(笔)</p>
          </div>
      </div>
    </div>
    <div class="mylist flex j-b a-i">
        <div @click="gomyCard(1)">
          <img src="../../assets/image/myone.png" alt="">
          <p>贷款记录</p>
        </div>
        <div @click="gomyCard(2)">
          <img src="../../assets/image/mytwo.png" alt="">
          <p>我的银行卡</p>
        </div>
        <div @click="cancatKF()">
            <img src="../../assets/image/mythree.png" alt="">
            <p>联系客服</p>
        </div>
    </div>
</div>
</template>

<script>
  import userback from '@/assets/image/myback.png'
  import { Dialog } from 'vant';
  import { getUserHomeInfo } from '@/apis/index';
  export default {
        name: "my",
      data(){
          return {
            showLoad:false,
            style:{
              backgroundImage:`url(${userback})`
            },
            userInfo:{}
          }
      },
      components:{
          [Dialog.name]:Dialog
      },
      mounted(){
          this.getUserHomeInfo()
      },
      computed:{},
      methods:{
        gomyCard(key){
          if(key===1) this.$router.push('/load')
          else if(key===2) this.$router.push('/cardList')
        },
        cancatKF(){
          this.$router.push('/Conact')
          // Dialog.confirm({
          //     // title: '',
          //     message: '联系客服时，请主动告知您注册时的手机号！',
          //     confirmButtonText:'拨打电话',
          //     cancelButtonColor:'#999999',
          //     confirmButtonColor:'#1E8CFF'
          //   }).then(() => {
          //     // on confirm
          //     // this.callphone()
          //   }).catch(() => {
          //     // on cancel
          //   });
          }, // 个人信息
        getUserHomeInfo () {
          getUserHomeInfo().then(res=>{
            if (!res.resultCode) {
              this.userInfo = res.data;
            }
          });
        },
        //拨打电话
        callphone(){
          let oA=document.createElement('a')
          oA.href='tel:16605813146'
          document.body.appendChild(oA);
          oA.click()
          oA.style.display='none'
        }

      },
    }
</script>

<style scoped lang="scss">
  $fs: #2F81FF;
.userInfo{
  padding: .8rem .6rem .7rem;
  background-size: cover;
  text-align: center;
  color: #ffffff;
  margin-bottom: .2rem;
  h4{
    font-size: .487rem;
    line-height: .66rem;
    margin-bottom: .04rem;
  }
  & > p{
    font-size: .24rem;
    line-height: .34rem;
    margin-bottom: .9rem;
  }
  .tag{
    display: inline-block;
    padding: 0 .2rem;
    background-color: #fff;
    font-size: .22rem;
    line-height: .42rem;
    color: #4084FF;
    margin-bottom: .46rem;
    border-radius: .21rem;
  }
  .history{
    font-size: .36rem;
    line-height: .5rem;
    p:last-child{
      font-size: .28rem;
      line-height: .4rem;
      margin-top: .08rem;
      color: rgba(255,255,255,.4);
    }
  }
}
  .mylist{
    background-color: #ffffff;
    padding:0 .22rem;
    font-size: .26rem;
    line-height: .36rem;
    color: #333333;
    text-align: center;
    & > div{
      padding: .22rem 0;
      flex: 1;
    }
    & > div:nth-child(3n-1){
      border-left: 1px solid #EEEEEE;
      border-right: 1px solid #EEEEEE;
    }
    img{
      display: inline;
      width: .44rem;
      height: .44rem;
      margin: 0 auto .18rem;
    }
  }
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
</style>
