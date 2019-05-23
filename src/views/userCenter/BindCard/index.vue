<template>
<!--  银行卡列表-->
  <div class="cardList">
    <div v-if="list.length<1" class="nocard">
      <img src="../../../assets/image/noCard.png" alt="">
      <p>您还未绑定银行卡</p>
      <div class="btn" @click="addCard()">去绑定</div>
    </div>
    <div v-else>
      <div class="top flex a-i" @click="addCard()">
        <img src="../../../assets/image/add.png" alt="">添加银行卡
      </div>
      <div class="list">
          <div v-for="(val,index) in list" :key="index" class="item" :style="val.type==1 ? style : (val.type==2 ? style1 : style2)" @click="updata(val)">
            <p>{{val.title}}</p>
            <p>储蓄卡</p>
            <p>{{val.num | bankFilter}}</p>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  import headerSub from '@/components/header/index'
  import footerSub from '@/components/footer/index'
  import js from '@/assets/image/jianshe.png'
  import gs from '@/assets/image/gs.png'
  import ny from '@/assets/image/ny.png'
    export default {
        name: "cardList",
      data(){
          return {
              list:[
                {type:1,title:'中国建设银行',num:'341125197809157070'},
                {type:2,title:'中国工商银行',num:'341125197809157070'},
                {type:3,title:'中国农业银行',num:'341125197809157070'},
              ],
            style:{
                backgroundImage:`url(${js})`
            },
            style1:{
                backgroundImage:`url(${gs})`
            },
            style2:{
                backgroundImage:`url(${ny})`
            },
          }
      },
      components:{
        headerSub,footerSub
      },
      mounted(){},
      computed:{

      },
      methods:{
        addCard(){
          this.$router.push('/bindCard')
        },
        updata(val){
          this.$router.push('/updataCard')
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
      p:nth-child(2){
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
