<template>
  <div class="personInfo">
    <!--<header-sub></header-sub>-->
    <!--<footer-sub></footer-sub>-->
    <van-cell-group>
      <van-field
        left-icon="icon iconfont icon-xingming"
        :value="userInfo.name"
        input-align="right"
        label="姓名"
        :readonly="true"
      />
      <van-field
        :value="userInfo.idNum | bankFilter"
        left-icon="icon iconfont icon-shenfenzheng"
        label="身份证号"
        input-align="right"
        :readonly="true"
      />
      <van-cell
        icon="icon iconfont icon-benzi"
        class="aurora-cell"
        title="借款用途"
        is-link
        required
        :value="usePurpose.type ? usePurpose.type : '请选择'" @click="showPicker(1)">
      </van-cell>
    </van-cell-group>
    <!--亲属-->
    <van-cell-group>
      <van-field
        left-icon="icon iconfont icon-xingming1"
        v-model="familyMember.name"
        input-align="right"
        label="直系亲属姓名"
        placeholder="请输入"
        required
      />
      <van-cell
        icon="icon iconfont icon-qunzu"
        class="aurora-cell"
        title="关系"
        is-link
        :value="familyMember.relationText ? familyMember.relationText : '请选择'"
        @click="showPicker(2)"/>
      <van-field
        left-icon="icon iconfont icon-icon--"
        v-model="familyMember.contacts"
        input-align="right"
        label="手机号"
        placeholder="请输入"
        required
      />
    </van-cell-group>
    <p class="person">紧急联系人</p>
    <van-cell-group class="mar-top20" v-for="(urgent, urgentInd) in urgentArr" :key="urgentInd">
      <van-field
        v-model="urgent.name"
        left-icon="icon iconfont icon-lianxiren"
        input-align="right"
        :label="urgentInd==0 ? '联系人1' : '联系人2'"
        required
        placeholder="请输入"
      />
      <van-cell
        icon="icon iconfont icon-qunzu"
        class="aurora-cell"
        title="关系"
        is-link
        :value="urgentArr[urgentInd].urgentUserText ?  urgentArr[urgentInd].urgentUserText : '请选择'"
        @click="showPicker(3,urgentInd)"
        />
      <van-field
        v-model="urgent.contacts"
        left-icon="icon iconfont icon-icon--"
        input-align="right"
        label="手机号"
        placeholder="请输入"
        required
      />
    </van-cell-group>
    <!--//提交按钮-->
    <div class="btnP">
      <div class="btn" @click="submitPersonForm()">提交</div>
    </div>
    <!--//选择弹框-->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="columns"
        :visible-item-count="3"
        value-key="type"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  import headerSub from '@/components/header/index'
  import footerSub from '@/components/footer/index'
  import { CellGroup, Cell, Field, Picker, Popup, Loading, Toast } from 'vant';
  import { setUserInfo, queryUserInfo, getUserInfo } from '@/apis/index';
  import { setStore } from '@/utils/storage';
  export default {
    name: "index",
    data() {
      return {
        bankCardCount:'',//银行卡数量
        userInfo: {
          // name: '张三',
          // idNum: '12345678999652',
        },
        usePurpose:{},//借款用途
        loanPurposeOps:[],//贷款用途选项数组
        relativeTypes: [], // 直系联系人关系数组
        userTypes: [], // 紧急联系人关系数组
        relatives: [], // 关系数组总和
        familyMember:{
          name: '',
          relationText: '',
          relativeType: 1,
          contacts: ''
        },
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        urgentArr: [
          {
            name: '',
            urgentUserText: '',
            urgentUserType: 5,
            contacts: ''
          },
          {
            name: '',
            urgentUserText: '',
            urgentUserType: 5,
            contacts: ''
          }
        ],
        popType:1,//弹框类型 1、借款用途 2、亲属关系 3、紧急联系人关系
        popTypenum:0,//0、紧急联系人1  1、紧急联系人2
        show:false
      }
    },
    components: {
      headerSub, footerSub, [Field.name]: Field, [Popup.name]: Popup, [Picker.name]: Picker, [CellGroup.name]: CellGroup,
      [Cell.name]: Cell, [Loading.name]: Loading,
    },
    mounted() {
      this.fetchUserInfo()
      this.getUserInfo()
    },
    computed: {},
    methods: {
      // 获取个人基本信息
       fetchUserInfo () {
       queryUserInfo().then(res=>{
         if (!res.resultCode) {
           let data = res.data;
           this.userInfo = data.userInfo;//个人信息
           this.loanPurposeOps = data.loanPurposeOps;//贷款用途
           this.relativeTypes = data.relativeTypes;// 直系联系人关系数组
           this.userTypes = data.userTypes;// 紧急联系人关系数组
           this.relatives = data.relatives;// 关系数组总和
           this._initData();
         }
       });
      },
      // 个人信息
      getUserInfo () {
      getUserInfo().then(res=>{
        if (!res.resultCode) {
          this.bankCardCount = res.data.bankCardCount;
          this.$store.commit('AUTHSTATUS', res.data.ocrStatus);
        }
      });
      },
      onConfirm(value, index) {
         console.log(value)
         if(this.popType===1)this.usePurpose=value
         if(this.popType===2){
           this.familyMember.relationText=value.type
           this.familyMember.relativeType=value.id
         }
         if(this.popType===3){
           this.urgentArr[this.popTypenum].urgentUserType=value.id
           this.urgentArr[this.popTypenum].urgentUserText=value.type
         }
        this.show = false;
      },
      onCancel() {
        this.show = false;
      },
      checkMobile (value, message) {//检测手机号
         let str=true
          if(value.length!==11){
            Toast(`${message}`)
            str=false
          }
          return str
      },
      paramsValidate (params, message,keycode) {//检测信息
         let str=true
        for (let key in params) {
          // if (params[key] !== 0 && !params[key] && key !== paramnull && key !== 'userId') {
          //   Toast(`${message}`);
          //   return
          // }
          if(!params[key] && key!==keycode && key !== 'userId'){
            console.log(params[key])
              Toast(`${message}`);
              str=false
            break
          }
        }
        return str
      },
      showPicker (type,index) {//唤醒弹框
        this.popType = type;
        this.popTypenum=index ? index : 0
        if(type===1) this.columns = this.loanPurposeOps;
        if(type===2) this.columns = this.relativeTypes;
        if(type===3) this.columns = this.userTypes;
        this.show = true;

        // this.columns = this[`${columnsName}`];
      },
      submitPersonForm(){
         if(!this.userInfo.name || !this.userInfo.idNum || !this.usePurpose.type){
           Toast('请完善个人信息')
           return
         }
         console.log(this.familyMember,this.urgentArr,this.checkMobile(this.familyMember.contacts,'直系亲属手机号输入有误'))
          if(!this.paramsValidate(this.familyMember,'请完善直系亲属信息','urgentUserType')) return
          if(!this.paramsValidate(this.urgentArr[0],'请完善紧急联系人信息','relativeType')) return
          if(!this.paramsValidate(this.urgentArr[1],'请完善紧急联系人信息','relativeType')) return
          if(!this.checkMobile(this.familyMember.contacts,'直系亲属手机号输入有误')) return
          if(!this.checkMobile(this.urgentArr[0].contacts,'紧急联系人手机号输入有误')) return
          if(!this.checkMobile(this.urgentArr[1].contacts,'紧急联系人手机号输入有误')) return
        console.log(222)
        this.setUserInfo()
      },
      // 组合relativesparam
      _orgRelative () {
        let _family = {...this.familyMember};
        let urgentArr = [...this.urgentArr];
        delete _family.urgentUserType;
        urgentArr.map(item => {
          delete item.relativeType;
        });
        urgentArr.unshift(_family);
        this.relatives = urgentArr;
      },
      // 提交个人基本信息
       setUserInfo () {
        this._orgRelative();
        console.log(this.relatives,this.usePurpose,this.bankCardCount)
        // debugger
        let {idNum, name} = this.userInfo;
        // 本地存储 loanPurpose
        // setStore('loanPurpose', this.usePurpose.id);//借款用途
       setUserInfo(
          idNum,
          name,
          this.usePurpose.id,
          this.relatives
        ).then(res=>{
         if (!res.resultCode) {
           // 判断银行卡数量
           if (this.bankCardCount) {
             this.$router.replace(`/signing?usePurposeId=${this.usePurpose.id}`); // 签约页面
           } else {
             this.$router.replace('/bindCard'); // 绑卡页面
           }
         } else {
           Toast(`${res.resultMessage}`);
         }
       });
      },
      // 初始化数据
      _initData () {
        let userInfo = this.userInfo;
        let purposeOptions = this.loanPurposeOps;//贷款用途数组
        let relativeTypes = this.relativeTypes;// 直系联系人关系数组
        let userTypes = this.userTypes;// 紧急联系人关系数组
        let urgentArr = [];
        this.usePurpose.id = userInfo.loanPurpose;//贷款选择的id
        // 借款用途 获取文字
        if (!!this.usePurpose.id) { // eslint-disable-line
          // let purposeText = purposeOptions.filter((item) => {
          //   return item.id === this.usePurpose.id;
          // })[0]['type'];
          // this.personal.text = purposeText;
          this.usePurpose = purposeOptions.filter((item) => {
            return item.id === this.usePurpose.id;
          })[0];
        }
        if (this.relatives) {
          this.relatives.map((relItem, index) => {
            if (relItem.relativeType !== '0') { // 直系
              this.familyMember = relItem;
              this.familyMember['relationText'] = relativeTypes.filter((item) => {
                return item.id === relItem.relativeType;
              })[0]['type'];
            }

            if (relItem.urgentUserType !== '0') {
              relItem['urgentUserText'] = userTypes.filter((item) => {
                return item.id === relItem.urgentUserType;
              })[0]['type'];
              urgentArr.push(relItem);
            }
          });
          this.urgentArr = urgentArr.slice(0, 2);
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .personInfo{
    /*min-height: 100%;*/
    background-color: #F6F6F6;
    .mar-top20{
        margin-bottom: .4rem;
    }
    .btnP{
      padding: .2rem .32rem;
      .btn{
        font-size: .36rem;
        color: #fff;
        text-align: center;
        line-height: .9rem;
        background-color: #2F81FF;
        border-radius: .1rem;
      }
    }
    .person{
      font-size: .26rem;
      color: #999;
      padding: .4rem .32rem .18rem;
      line-height: .36rem;
    }
  }
</style>
<style>
  .personInfo .van-cell--required::before{
    color: #2F81FF;
  }
  .personInfo  .van-field__control--right{

  }
</style>
