<template>
<!--  服务协议-->
  <section>
    <!--<headerSub></headerSub>-->
    <div class="login" v-if="type==1">
      <div>
        请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。
      </div>
      <div>
        本协议约定陌陌科技与用户之间关于“陌陌”软件服务（以下简称“服务”）的权利义务。“用户”是指注册、登录、使用本服务的个人。本协议可由陌陌科技随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本网站查阅最新版协议条款。在陌陌科技修改协议条款后，如果用户不接受修改后的条款，请立即停止使用陌陌科技提供的服务，用户继续使用陌陌科技提供的服务将被视为接受修改后的协议。
      </div>
    </div>
    <div class="sing" v-if="type==2" v-html="ServiceAgreement.content">
    </div>
  </section>
</template>

<script>
  import headerSub from '@/components/header/index'
  import { mapGetters } from 'vuex'
  export default {
    name: "serviceAgreement",
    data() {
      return {}
    },
    components:{
      headerSub
    },
    mounted() {
    },
    computed: {
      ...mapGetters([
          'ServiceAgreement'
      ]),
      type(){
        return this.$route.query.type
      }
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
  .login{
    padding: 0 ;
  }
  div{
    text-align: left;
    font-size: 0.3rem;
    color: #7B7B7B;
    line-height: 0.56rem;
    padding: 0.4rem 0.4rem 0 0.4rem;
  }
  .login div:last-child{
    padding-top: 0;
  }
  .sing{
    padding-bottom: .5rem;
  }
</style>
