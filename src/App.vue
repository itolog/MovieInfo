<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
const appMain = () => import('./components/app-main.vue')
const appCard = () => import('./components/card/app-card.vue')
export default {
  name: 'app',
  components: {
    appMain,
    appCard
  }
}
</script>

<style>
html, body{
  	position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
#app{
    height: 100%;
    width: 100%;
}
a{
  text-decoration: none;
  display: block;
  cursor: pointer;
}
li{
  list-style: none;
}
</style>
