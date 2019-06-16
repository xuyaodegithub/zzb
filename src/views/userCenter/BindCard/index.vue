<template>
<!--  银行卡列表-->
  <div class="cardList">
    <div v-if="banklist.length<1" class="nocard">
      <img src="../../../assets/image/noCard.png" alt="">
      <p>您还未绑定银行卡</p>
      <!--<div class="btn" @click="addCard()">去绑定</div>-->
    </div>
    <div v-else>
      <div class="top flex a-i" @click="addCard()">
        <img src="../../../assets/image/add.png" alt="">添加银行卡
      </div>
      <div class="list">
          <div v-for="(val,index) in banklist" :key="index" class="item" :style="{ backgroundImage:`url(${bankback(val.bankCode)})` }" @click="updata(val)">
            <i v-if="val.isMaster==1">默认卡</i>
            <p>{{val.bankName}}</p>
            <p>储蓄卡</p>
            <p>{{val.cardNo | bankFilter}}</p>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { getBankList } from '@/apis/index';
  import { Toast } from 'vant';
  import js from '@/assets/image/jianshe.png'
  import gs from '@/assets/image/gs.png'
  import ny from '@/assets/image/ny.png'
  import initback from '@/assets/image/initbank.jpg'
    export default {
        name: "cardList",
      data(){
          return {
            banklist:[
                // {bankCode:'CCB',bankName:'中国建设银行',cardNo:'341125197809157070',isMaster:0},
                // {bankCode:'ICBC',bankName:'中国工商银行',cardNo:'341125197809157070',isMaster:1},
                // {bankCode:'ABC',bankName:'中国农业银行',cardNo:'341125197809157070',isMaster:0},
                // {bankCode:'ABCs',bankName:'中国农业银行',cardNo:'341125197809157070',isMaster:0},
              ],
          }
      },
      components:{

      },
      mounted(){
          this.fetchBankList()
      },
      computed:{

      },
      methods:{
        bankback(val){
          if(val==='CCB')return js;
          else if(val==='ICBC')return gs;
          else if(val==='ABC')return ny;
          else return initback
        },
        fetchBankList () {//获取银行卡列表
         getBankList().then(res=>{
           if (!res.resultCode) {
             this.banklist = res.data.bankCards;
           } else {
             Toast(`${res.resultMessage}`);
           }
         });
        },
        addCard(){
          this.$router.push(`/bindCard?back=list`)
        },
        updata(val){
          this.$router.push(`/updataCard?carditem=${JSON.stringify(val)}&num=${this.banklist.length}`)
        }
      },
    }
</script>

<style scoped lang="scss">
  .cardList{
    padding: .4rem .46rem;
    .item{
      font-size: .34rem;
      color: #fff;
      line-height: .48rem;
      padding: .44rem 0 .44rem 1.3rem;
      margin-top: .4rem;
      /*background-position: center;*/
      background-size: cover;
      border-radius: .08rem;
      position: relative;
      i{
        position: absolute;
        right: .6rem;
        top: .3rem;
        font-size: .12rem;
      }
      p:nth-child(3){
        font-size: .22rem;
        line-height: .32rem;
        margin:.08rem 0 .12rem 0;
      }
      p:last-child{
        font-size: .3rem;
        line-height: .42rem;
      }
    }
    .nocard{
      padding-top: 2rem;
      img{
        display: block;
        margin: 0 auto;
        width: 1.24rem;
        margin-bottom: .7rem;
      }
      p{
        font-size: .3rem;
        margin-bottom: 1.6rem;
        color:#AAAAAA;
        text-align: center;
      }
      .btn{
        font-size: .36rem;
        text-align: center;
        color: #fff;
        line-height: .9rem;
        background-color: #2F81FF;
        border-radius: .1rem;
      }
    }
  }
  .top{
    justify-content: center;
    font-size: .3rem;
    line-height: 1rem;
    color: #333;
    border: 1px dashed #9e9e9e;
    img{
      margin-right: .24rem;
      width: .34rem;
      height: .34rem;
    }
  }
</style>
