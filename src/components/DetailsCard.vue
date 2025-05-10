<template>
  <div class="details-card" @click.stop>
    <div>
      <h2>{{ updatedSchool.name }} {{ updatedSchool.institute }}</h2>
      <p>{{ updatedSchool.description }}</p>
      <p><strong>日期:</strong> {{ updatedSchool.date }}</p>
      <p><strong>网址:</strong> <a :href="updatedSchool.website" target="_blank">{{ updatedSchool.website }}</a></p>
      <div class="tags">
        <span v-for="tag in updatedSchool.tags" :key="tag" :style="{color: hashColor(tag), borderColor: hashColor(tag)}">{{ tag }}</span>
      </div>
      <div class="progress-container" v-if="countdownType === 'ring'">
        <ProgressRing v-for="(progress, label) in updatedSchool.progress" :key="label" :label="label" :progress="progress" :num="updatedSchool.times[label]"></ProgressRing>
      </div>
      <div class="text-countdown" v-else>
        {{ updatedSchool.countdown }}
      </div>
    </div>
  </div>
</template>

<script>
import ProgressRing from './ProgressRing.vue';

export default {
  components: {
    ProgressRing
  },
  props: {
    school: Object,
    countdownType: String
  },
  data() {
    return {
      intervalId: null,
    };
  },
  computed: {
    updatedSchool() {
      const now = new Date();
      const school = this.school; // 创建学校对象的副本
      if (school.deadline !== 'N/A' && school.deadline !== '') {
        const deadlineDate = new Date(school.deadline);
        const timeRemaining = deadlineDate - now;
        if (timeRemaining >= 0) {
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          school.date = this.formatDate(deadlineDate);
          school.timeRemaining = timeRemaining;
          school.countdown = `${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;
          school.times = { days, hours, minutes, seconds };
          school.progress = {
            days: (days / 90) * 100,
            hours: (hours / 24) * 100,
            minutes: (minutes / 60) * 100,
            seconds: (seconds / 60) * 100
          };
        } else {
          school.timeRemaining = Infinity;
          school.countdown = '已经结束';
          school.date = this.formatDate(deadlineDate);
          school.times = { days: 0, hours: 0, minutes: 0, seconds: 0 };
          school.progress = { days: 100, hours: 100, minutes: 100, seconds: 100 };
        }
      } else {
        school.timeRemaining = 10000000000;
        school.countdown = 'N/A';
        school.date = 'N/A';
        school.times = { days: 'N/A', hours: 'N/A', minutes: 'N/A', seconds: 'N/A' };
        school.progress = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return school;
    }
  },
  methods: {
    formatDate(date) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      return new Intl.DateTimeFormat('zh-CN', options).format(date);
    },
    hashColor(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
      return "#" + "00000".substring(0, 6 - color.length) + color;
    }
  }
};
</script>

<style scoped>
.details-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  box-shadow: var(--shadow);
  z-index: 1000;
  border-radius: 20px;
  pointer-events: auto;
  color: var(--text-color);
  max-width: 90%;
  width: 600px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.details-card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.75rem;
  color: var(--text-color);
  font-weight: 600;
  line-height: 1.4;
}

.details-card p {
  margin: 0.75rem 0;
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.9;
  line-height: 1.6;
}

.details-card a {
  color: var(--primary-color);
  word-break: break-all;
  text-decoration: none;
  transition: var(--transition);
}

.details-card a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tags span {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid;
  border-radius: 6px;
  transition: var(--transition);
  background: rgba(255, 255, 255, 0.8);
}

.tags span:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.progress-container {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.text-countdown {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  text-align: center;
  margin-top: 1.5rem;
}

@media screen and (max-width: 768px) {
  .details-card {
    width: 95%;
    padding: 1.5rem;
    margin: 0;
  }

  .details-card h2 {
    font-size: 1.5rem;
  }

  .details-card p {
    font-size: 0.875rem;
  }

  .progress-container {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .text-countdown {
    font-size: 1rem;
    padding: 0.75rem;
  }
}

/* Dark mode styles */
.dark-mode .details-card {
  background: rgba(30, 30, 35, 0.95);
  border-color: var(--border-color);
  color: var(--text-color);
}

.dark-mode .details-card h2,
.dark-mode .details-card p {
  color: var(--text-color);
}

.dark-mode .details-card a {
  color: var(--primary-color);
}

.dark-mode .tags span {
  background: rgba(40, 40, 45, 0.8);
}

.dark-mode .progress-container,
.dark-mode .text-countdown {
  background: rgba(40, 40, 50, 0.7);
  color: var(--text-color);
}
</style>
