const mutations={
  AUTHSTATUS (state, value) {
    state.page.authStatus = value;
  },
  SETS_ERVER(state,data){
    state.page.ServiceAgreement=data
  }
}

export default mutations
