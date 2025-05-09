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
  mounted() {
    this.theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    localStorage.setItem('theme', this.theme);
  },
};
</script>

<style scoped>
header {
  margin-bottom: 2em;
  text-align: center;
}

.navbar {
  min-height: 4em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 2em;
  box-sizing: border-box;
  transition: var(--transition);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar h3 {
  padding: 0;
  margin: 0;
  font-size: 1.8em;
  font-weight: 600;
  background: linear-gradient(45deg, var(--primary-color), #2196f3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar.light {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: var(--text-color);
}

.navbar.dark {
  background-color: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(10px);
  color: var(--text-color);
}

.toggle-switch {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: var(--border-color);
  width: 60px;
  height: 30px;
  border-radius: 15px;
  position: relative;
  transition: var(--transition);
  margin: 0 1rem;
}

.toggle-switch-text {
  background-color: var(--success-color);
}

.toggle-knob {
  width: 26px;
  height: 26px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: var(--transition);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-knob-text {
  transform: translateX(30px);
}

.toggle-label {
  font-size: 14px;
  color: var(--text-color);
  user-select: none;
  width: 50%;
  text-align: center;
  font-weight: 500;
}

#dropdown-container {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin: 0 auto 1.5em;
  padding: 0.7em;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow);
  max-width: 800px;
  border: 1px solid var(--border-color);
}

#source-select {
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background-color: var(--secondary-color);
  color: var(--text-color);
  cursor: pointer;
  transition: var(--transition);
}

#source-select:hover {
  border-color: var(--primary-color);
}

#source-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.intro {
  max-width: 800px;
  margin: 0 auto 1.5em;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.intro h1 {
  font-size: 1.8em;
  margin: 0;
  padding: 1em;
  color: var(--text-color);
  font-weight: 700;
  background: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid var(--border-color);
}

.intro p {
  margin: 0;
  padding: 0.8em 1.5em;
  line-height: 1.5;
  color: var(--text-color);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.intro p:last-child {
  border-bottom: none;
}

.intro a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
  font-weight: 500;
}

.intro a:hover {
  text-decoration: underline;
}

/* Dark mode styles for intro */
.dark-mode .intro {
  background: rgba(30, 30, 35, 0.8);
  border-color: rgba(70, 70, 80, 0.5);
}

.dark-mode .intro h1 {
  background: rgba(40, 40, 50, 0.5);
  border-color: rgba(70, 70, 80, 0.5);
}

.dark-mode .intro p {
  border-color: rgba(255, 255, 255, 0.05);
}

.darkmode-switch {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: var(--transition);
}

.darkmode-switch:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Dark mode style for dropdown */
.dark-mode #dropdown-container {
  background: rgba(30, 30, 35, 0.8);
  border-color: rgba(70, 70, 80, 0.5);
}

@media screen and (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1em;
  }

  .navbar h3 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }

  .intro {
    padding: 1em;
    margin: 0 1em;
  }

  .intro h1 {
    font-size: 2em;
  }

  #dropdown-container {
    flex-direction: column;
    width: 90%;
    margin: 1em auto;
  }

  #source-select {
    width: 100%;
  }
}
</style>
