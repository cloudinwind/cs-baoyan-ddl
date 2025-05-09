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
:root {
  --primary-color: #4a90e2;
  --secondary-color: #f5f6fa;
  --text-color: #2c3e50;
  --border-color: #e1e4e8;
  --success-color: #2ecc71;
  --warning-color: #f1c40f;
  --danger-color: #e74c3c;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  background-color: var(--secondary-color);
  line-height: 1.6;
}

.wrapper {
  min-height: 100vh;
  background-color: var(--secondary-color);
  transition: var(--transition);
}

/* Dark mode styles */
.dark-mode {
  --primary-color: #64b5f6;
  --secondary-color: #121212;
  --text-color: #ffffff;
  --border-color: #2c2c2c;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
}

.dark-mode body {
  background-color: #121212;
  color: var(--text-color);
}

.dark-mode .wrapper {
  background-color: #121212;
}

/* Common utility classes */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 20px;
  transition: var(--transition);
}

.dark-mode .card {
  background: #1e1e23;
  border-color: var(--border-color);
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>