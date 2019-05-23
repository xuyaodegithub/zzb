<template>
  <div class="personInfo">
    <!--<header-sub></header-sub>-->
    <!--<footer-sub></footer-sub>-->
    <van-cell-group>
      <van-field
        :value="uesrInfo.name"
        input-align="right"
        label="姓名"
        :readonly="true"
      />
      <van-field
        :value="uesrInfo.idNum"
        label="身份证号"
        input-align="right"
        :readonly="true"
      />
      <van-cell
        class="aurora-cell"
        title="借款用途"
        is-link
        required
        value="请选择">
      </van-cell>
    </van-cell-group>
    <!--亲属-->
    <van-cell-group>
      <van-field
        v-model="familyMember.name"
        input-align="right"
        label="直系亲属姓名"
        placeholder="请输入"
        required
      />
      <van-cell
        class="aurora-cell"
        title="关系"
        is-link
        arrow-direction="down"
        value="请选择"/>
      <van-field
        v-model="familyMember.phone"
        input-align="right"
        label="手机号"
        placeholder="请输入"
        required
      />
    </van-cell-group>
    <p class="person">紧急联系人</p>
    <van-cell-group class="mar-top20" v-for="(urgent, urgentInd) in urgentArr" :key="urgentInd">
      <van-field
        v-if="urgentInd === 0"
        v-model="urgent.name"
        input-align="right"
        label='紧急联系人1'
        required
      />
      <van-cell
        class="aurora-cell"
        title="关系"
        is-link
        value="请选择"
        />
      <van-field
        v-model="urgent.contacts"
        input-align="right"
        label="手机号"
        placeholder="请输入"
        required
      />
    </van-cell-group>
    <!--//提交按钮-->
    <div class="btnP">
      <div class="btn">提交</div>
    </div>
    <!--//选择弹框-->
    <van-popup v-model="show" position="bottom" :overlay="false">
      <van-picker
        show-toolbar
        :columns="columns"
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

  export default {
    name: "index",
    data() {
      return {
        uesrInfo: {
          name: '张三',
          idNum: '12345678999652',
        },
        familyMember:{
          name:'王柳',
          contacts:'兄弟',
          phone:'15652463698'
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
        show:false
      }
    },
    components: {
      headerSub, footerSub, [Field.name]: Field, [Popup.name]: Popup, [Picker.name]: Picker, [CellGroup.name]: CellGroup,
      [Cell.name]: Cell, [Loading.name]: Loading,
    },
    mounted() {
    },
    computed: {},
    methods: {
      onConfirm(value, index) {
        Toast(`当前值：${value}, 当前索引：${index}`);
      },
      onCancel() {
        Toast('取消');
      }
    },
  }
</script>

<style scoped lang="scss">
  .personInfo{
    /*min-height: 100%;*/
    background-color: #F6F6F6;
    .btnP{
      padding: .6rem .32rem;
      padding-bottom: 0;
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
</style>
