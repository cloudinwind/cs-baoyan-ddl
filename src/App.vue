<template>
  <div class="wrapper">
    <Home />
  </div>
</template>

<script>
import { toDarkMode, toLightMode } from './utils/darkmode';
import Home from './views/Home.vue';

export default {
  name: 'App',
  components: {
    Home
  },
  mounted(){
    if(localStorage.getItem('theme') === null){
      localStorage.setItem('theme','light')
    }
    if(localStorage.getItem('theme') === 'dark'){
      toDarkMode()
    }else{
      toLightMode()
    }
  }
};
</script>

<style>
</style>