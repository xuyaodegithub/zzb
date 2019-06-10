<template>
  <div class="section">
    <div class="flex a-i j-b ocrCard">
      <div>
        <van-uploader :after-read="onRead" accept="image/*">
          <div v-if="showFloading" class="loadings flex a-i">
            <div>
              <van-loading color="#1989fa" class="loadingIcon"/>
              <p>上传中...</p>
            </div>
          </div>
          <div v-else>
            <img src="../../assets/image/peoper.png" alt="" v-if="!isup">
            <img :src="isup" alt="图片加载错误" v-else>
          </div>
        </van-uploader>
      </div>
      <div>
        <van-uploader :after-read="onReadback" accept="image/*">
          <div v-if="showDloading" class="loadings flex a-i">
            <div>
              <van-loading color="#1989fa" class="loadingIcon"/>
              <p>上传中...</p>
            </div>
          </div>
          <div v-else>
            <img src="../../assets/image/coun.png" alt="" v-if="!isdown">
            <img :src="isdown" alt="图片加载错误" v-else>
          </div>
        </van-uploader>
      </div>
    </div>
    <div class="bittom">
      <img src="../../assets/image/fexzp.png" alt="">
      <div class="btn" :class="{'active' : isActive }" @click="handerUpload()">下一步</div>
    </div>
    <div class="zhezhao" v-show="showModel" @click="showModel=false"></div>
    <div class="warning" v-show="showModel">
      <img src="../../assets/image/error.png" alt="">
      {{errMsg}}
    </div>
  </div>

</template>

<script>
  // import { Uploader } from 'vant';
  import { Uploader, Toast, Loading } from 'vant';
  import { handleOcrPrepare, handleOcrResult } from '@/apis/index';
  const formdata = new FormData();
    export default {
        name: "index",
      data(){
          return {
              isup:'',
              isdown:'',
              showModel:false,
              showFloading:false,
              showDloading:false,
              errMsg:''
          }
      },
      components:{
          [Uploader.name]:Uploader,
          [Toast.name]:Toast,
          [Loading.name]:Loading,
      },
      mounted(){},
      computed:{
        productId () {
          return this.$route.query.productId;
        },
        isActive(){
          return this.isdown && this.isup
        }
      },
      methods:{
        nextTo(){
          // // if(!isup || !isdown) return
          // this.$router.push('/personInfo')
        },
        onRead(file) {
         console.log(file)
          // this.isup=file.content
          this.fetchOcrPrepare('F', file.file,file.content);

        },
        onReadback(file) {
          this.fetchOcrPrepare('B', file.file,file.content);
        },
        // 后台检测身份证
         fetchOcrPrepare (picType, file, picurl) {//检查身份证
           if(picType==='F')this.showFloading=true;
           else this.showDloading=true;
          formdata.set('productId', this.productId);
          formdata.set('picType', picType);
          formdata.set('picture', file);
          handleOcrPrepare(formdata).then(res=>{
            this.showFloading=false
            this.showDloading=false
             if (res === 'networkdisconnect' || res === 'timeout') {
               console.log('超时');
               console.timeEnd('pic');
               Toast('网络错误,请重新尝试!')
               return;
             }
             if (!res.resultCode && !res.data.status) {
               console.log('图片验证成功');
               console.timeEnd('pic');
               if(picType==='F') this.isup=picurl
               else this.isdown=picurl
             } else {
               Toast(`${res.data.message || res.data.resultMessage} || `);
             }
           });//
          console.time('pic');
        },
        handerUpload () {//下一步
          if(!this.isActive) return
          Toast.loading({
            duration:0,
            mask: true,
            message: '正在进行身份认证...'
          });
          handleOcrResult().then(res=>{
            Toast.clear()
            if (res === 'networkdisconnect' || res === 'timeout') {
              Toast('网络错误。请重新尝试!')
              return;
            }
            if (!res.resultCode) {
              this.$router.replace('/selfAuthentication');
              // this.$router.push('/personInfo');
            } else {
              this.isup = '';
              this.isdown = '';
              this.errMsg = res.resultMessage;
              this.showModel=true
            }
          });

        }
      },
    }
</script>

<style scoped lang="scss">
  .section{
    /*min-height: 100%;*/
    background-color: #F6F6F6;
    .flex.ocrCard{
      background-color: #ffffff;
      padding: 0.32rem;
      img{
        display: block;
        width: 3.3rem;
        height: 2.5rem;
      }
    }
    .bittom{
      margin-top: 0.36rem;
      padding:0 0.32rem ;
      img{
        display: block;
        width: 100%;
      }
      .btn{
        margin-top: 2.8rem;
        font-size: 0.36rem;
        line-height: .9rem;
        background-color: #2F81FF;
        opacity: .5;
        color: #fff;
        border-radius: 0.1rem;
        text-align: center;
      }
      div.active{
        opacity: 1;
      }
    }
    .warning{
      z-index: 999;
      position: fixed;
      top: 50%;
      left: 50%;
      width: 2.56rem;
      /*height: 2.56rem;*/
      color: #fff;
      background-color: #20232D;
      border-radius: 0.1rem;
      margin-top: -1.28rem;
      margin-left: -1.28rem;
      text-align: center;
      font-size: .28rem;
      padding:0 .28rem 0.28rem;
      img{
        display: block;
        width: .64rem;
        height: .64rem;
        margin: .3rem auto .3rem;
      }
    }
  }
  .loadings{
    font-size: .28rem;
    text-align: center;
    width: 3.3rem;
    height: 2.5rem;
    .loadingIcon,& > div{
      margin: 0 auto;
    }
    .loadingIcon{
      margin-bottom: .2rem;
    }
  }
</style>
