<template>
  <div id="app">
    <transition name="slide">
      <router-view class="child"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.slide-enter-active {
  transform: translateX(100%);
}
.slide-leave-active {
  transform: translateX(-100%);
}
.slide-enter, .slide-leave-to {
  /*opacity: 0;*/
}
  .child{
    transition: all .15s linear;
  }
</style>
