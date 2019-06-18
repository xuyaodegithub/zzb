<template>
<!--  银行卡编辑解绑-->
  <div class="updataCard">
    <div class="item flex" :style="{ backgroundImage:`url(${bankback(cardItem.bankCode)})` }">
        <div>
          <p>{{cardItem.bankName}}</p>
          <p>储蓄卡</p>
          <p>{{cardItem.cardNo | bankFilter}}</p>
        </div>
        <div class="btn" @click="Unbind()">解绑</div>
    </div>
    <div class="flex btn">
      <div style="display:flex;align-items: center;">
        <span style="margin-right: 10px;color: #2F81FF;">设为默认卡</span>
        <van-switch
          @input="open"
          :value="checked"
          size="20px"
          active-color="#2F81FF"
        />
      </div>
      <!--<div @click="Unbind()">解除绑定</div>-->
    </div>
  </div>
</template>

<script>
// import { orderstatusMatch } from 'utils/match';
import { Row, Col, PasswordInput, NumberKeyboard, Popup, Dialog, Toast, Icon, Button, Switch } from 'vant';
import { setdefaultCard, releaseCard } from '@/apis/index';
// import { getStore } from 'utils/storage.js';
import js from '@/assets/image/jianshe.png'
import gs from '@/assets/image/gs.png'
import ny from '@/assets/image/ny.png'
import initback from '@/assets/image/initbank.jpg'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Switch.name]: Switch
  },
  data () {
    return {
      // item:{type:1,title:'中国建设银行',cardNo:'341125197809157070',bankCode:'ICBC'},
      checked: false
    };
  },
  computed: {
    cardItem(){
      return JSON.parse(this.$route.query.carditem)
    },
    cardNum(){
      return this.$route.query.num
    }
  },
  methods: {
    setInit(){
      if(this.cardItem.isMaster==1) this.checked=true
      else this.checked=false
    },
    bankback(val){
      if(val==='CCB')return js;
      else if(val==='ICBC')return gs;
      else if(val==='ABC')return ny;
      else return initback
    },
    Unbind () {
      let _self = this;
      Dialog.confirm({
        title: '提示',
        message: '确定要解除绑定此银行卡么？'
      }).then(() => {
        if(_self.cardNum < 2 ){
          Toast('只有一张银行卡不可解绑')
          return
        }
        if(_self.cardItem.isMaster==1){
          Toast('默认卡不可解绑')
          return
        }
        let cardNo = _self.cardItem.cardNo.slice(_self.cardItem.cardNo.length-4)
        releaseCard(_self.cardItem.cardIdx,_self.cardItem.cardNo).then(res=>{
          if(!res.resultCode) {
            if(!res.data.bindStatus){
              Toast('解绑成功')
              this.$router.replace('/cardList')
            } else  Toast(`${res.data.bindMsg}`);
          } else Toast(`${res.resultMessage}`)
        })
      }).catch(() => {
        // on cancel
      });
    },
    open (checked) {
      // if (this.checked) Toast({duration: 500, message: '设置默认成功'});
      // else Toast({duration: 500, message: '取消默认成功'});
      if(this.checked){
        Toast('此卡处于默认状态,无需设置')
        return
      }
      let _self=this
      Dialog.confirm({
        title: '提醒',
        message: '是否设置此卡默认？'
      }).then(() => {
        let cardNo = _self.cardItem.cardNo.slice(_self.cardItem.cardNo.length-4)
        setdefaultCard(_self.cardItem.cardIdx,_self.cardItem.cardNo).then(res=>{
              if(!res.resultCode){
                  if(!res.data.bindStatus){
                    Toast('设置默认成功')
                    this.checked = true;
                  } else  Toast(`${res.data.bindMsg}`);
              }else Toast(`${res.resultMessage}`)
        }).catch(err=>{
          console.log(err)
        })
      });
    }
  },
  mounted () {
    this.setInit()
  }
};
</script>

<style lang="scss" scoped>
.updataCard{
  padding:.4rem .46rem;
  .item{
    padding: .44rem .26rem 1.1rem 1.3rem;
    background-size: cover;
    background-repeat: no-repeat;
    /*background-position: center;*/
    font-size: .34rem;
    color: #fff;
    line-height: .48rem;
    justify-content: space-between;
    margin-bottom: .4rem;
    border-radius: .08rem;
    p:nth-child(2){
      font-size: .22rem;
      line-height: .32rem;
      margin:.08rem 0 .12rem 0;
    }
    p:last-child{
      font-size: .3rem;
      line-height: .42rem;
    }
    .btn{
      height: .6rem;
      line-height: .6rem;
      width: 1.24rem;
      text-align: center;
      border: 1px solid #fff;
      border-radius: 0.1rem;
    }
  }
}


</style>

