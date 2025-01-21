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
.app.light {
  background-color: #f4f4f9;
  color: black;
}

.app.dark {
  background-color: #282828;
  color: #f4f4f9;
}

h1, h2, h3, p {
  color: inherit;
}

/* 你可以根据需要调整其他元素 */
a {
  color: #bb86fc;
  text-decoration: none;
}
</style>