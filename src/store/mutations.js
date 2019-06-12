const mutations={
  AUTHSTATUS (state, value) {
    state.page.authStatus = value;
  },
  SETS_ERVER(state,data){
    state.page.ServiceAgreement=data
  },
  CHANG_APP (state, value) {
    state.page.appOrh5 = value;
  }
}

export default mutations
