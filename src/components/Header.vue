<template>
  <header>
    <div :class="['navbar', theme]">
      <div style="display: flex; justify-content: center; align-items: center;">
        <img src="../assets/cs-baoyan-logo.png" alt="icon"
          style="height: 3em; margin-right: 1em; border-radius: 5px;" />
        <h3>CS BAOYAN Deadlines</h3>
      </div>
      <div style="display: flex; justify-content: space-around; align-items: center;">
        <div class="toggle-switch" :class="{ 'toggle-switch-text': countdownType === 'text' }"
          @click="toggleCountdownType">
          <div class="toggle-knob" :class="{ 'toggle-knob-text': countdownType === 'text' }"></div>
          <span class="toggle-label">文</span>
          <span class="toggle-label">〇</span>
        </div>
        <div class="darkmode-switch" style="display: flex; justify-content: center; align-items: center; width: 3.5em;">
          <el-icon v-if="theme === 'dark'" @click="toggleTheme"><i style="font-size: 2em;">
              <Moon></Moon>
            </i></el-icon>
          <el-icon v-if="theme === 'light'" @click="toggleTheme"><i style="font-size: 2em;">
              <Sunny></Sunny>
            </i></el-icon>
        </div>
      </div>
    </div>
    <div class="intro">

      <h1>CS BAOYAN Deadlines</h1>
      <p>
        计算机保研DDL，
        <a href="https://github.com/CS-BAOYAN/CS-BAOYAN-DDL">GitHub链接</a>，
        欢迎PR。
      </p>
      <p>
        <strong>声明:</strong> 本网站排序使用时间+字典序排序，DDL均为人为收集，起到参考作用，如有错误不承担任何责任。
      </p>
      <p>
        全部DDL的显示使用 Asia/Shanghai 时间。一切20XX年XX月XX日截至的夏令营/预推免，在DDL中均显示为20XX年XX月XX+1日零点。
      </p>
      <p>
        <u>院校 Tags 的筛选</u>使用<strong>或逻辑</strong>。<u>开营 Tags 的筛选</u>与<u>院校 Tags 的结果</u><strong>共同构成且逻辑</strong>。
      </p>
      <p>
        <strong>2024 夏令营信息已经暂时停止更新，2024 预推免信息开始保持与绿群 Github 仓库同步</strong>。
      </p>
    </div>
  </header>
  <div id="dropdown-container">
    <label for="source-select">选择数据源:</label>
    <select v-model="selectedSource" @change="onSourceChange" id="source-select">
      <option value="camp2025">夏令营2025</option>
      <option value="yutuimian2024">预推免2024</option>
      <option value="camp2024">夏令营2024</option>
    </select>
  </div>
</template>

<script>
import { toDarkMode, toLightMode } from '@/utils/darkmode';
import { Sunny, Moon } from '@element-plus/icons-vue';
export default {
  name: 'HeaderComponent',
  data() {
    return {
      selectedSource: 'camp2025',
      countdownType: 'text',
      theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    };
  },
  components: {
    Sunny,
    Moon
  },
  methods: {
    onSourceChange() {
      this.$emit('source-change', this.selectedSource);
    },
    toggleCountdownType() {
      this.countdownType = this.countdownType === 'ring' ? 'text' : 'ring';
      this.$emit('toggle-countdown', this.countdownType);
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
      if (this.theme === 'dark') {
        toDarkMode()
      } else {
        toLightMode()
      }
    },
  },
};
</script>

<style scoped>
header {
  margin-bottom: 2em;
  text-align: center;
  /* position: relative; */
}

.toggle-switch {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #ddd;
  width: 60px;
  height: 30px;
  border-radius: 15px;
  position: relative;
  transition: background-color 0.3s;
}

.toggle-switch-text {
  background-color: #4CAF50;
  /* 文模式的背景色 */
}

.toggle-knob {
  width: 28px;
  height: 28px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}

.toggle-knob-text {
  transform: translateX(30px);
}

.toggle-label {
  font-size: 14px;
  color: #666;
  user-select: none;
  width: 50%;
  text-align: center;
}

#dropdown-container {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
  /* position: absolute; */
  /* top: 10px; */
  /* right: 10px; */
}

#source-select {
  padding: 5px;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

@media screen and (max-width: 768px) {
  #dropdown-container {
    position: static;
    /* 取消绝对定位 */
    margin-top: 10px;
    /* 增加顶部外边距 */
    justify-content: center;
    /* 居中对齐 */
  }

  #toggle-container {
    position: static;
    /* 取消绝对定位 */
    margin-top: 10px;
    /* 增加顶部外边距 */
    justify-content: center;
    /* 居中对齐 */
  }
}

.navbar {
  min-height: 4em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 2em;
  box-sizing: border-box;
  transition: background-color var(--transition-duration) ease,
    color var(--transition-duration) ease;
}

.navbar h3 {
  padding: 0;
  margin: 0;
  font-size: 1.8em;
}

@media screen and (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }

  .navbar h3 {
    padding: 0;
    margin: 0;
    font-size: 1.3em;
  }
}

.navbar.light {
  background-color: #d8f1eb;
  color: black;
}

.navbar.dark {
  background-color: #1a1a1a;
}

@media screen and (max-width: 768px) {
  .intro{
    padding: 0 5%;
    box-sizing: border-box;
  }
}
</style>
