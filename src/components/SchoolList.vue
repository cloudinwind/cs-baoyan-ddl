<template>
  <div id="school-list">
    <div v-for="school in filteredSchools" :key="school.id" :class="['school', school.timeRemaining === Infinity ? 'red' : 'green']" @click="showDetails(school)">
      <div class="school-header">
        <h2>{{ school.name }} <span class="institute">{{ school.institute }}</span></h2>
      </div>
      <div class="school-content">
        <p class="description">{{ school.description }}</p>
        <p><strong>日期:</strong> {{ school.date }}</p>
        <p><strong>网址:</strong> <a :href="school.website" target="_blank" @click.stop>{{ school.website }}</a></p>
        <div class="tags">
          <span v-for="tag in school.tags" :key="tag" :style="{color: hashColor(tag), borderColor: hashColor(tag)}">{{ tag }}</span>
        </div>
      </div>
      <div class="school-footer">
        <div class="progress-container" v-if="countdownType === 'ring'">
          <ProgressRing v-for="(progress, label) in school.progress" :key="label" :label="label" :progress="progress" :num="school.times[label]"></ProgressRing>
        </div>
        <div class="text-countdown" v-else>
          {{ school.countdown }}
        </div>
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
    schools: Array,
    selectedFilters: Array,
    searchQuery: String,
    countdownType: String
  },
  computed: {
    filteredSchools() {
      const now = new Date();
      return this.schools
        .filter(school => {
          const hasStartedTag = this.selectedFilters.includes('已开营');
          const hasEndedTag = this.selectedFilters.includes('已结营');
          
          const matchesStartedTag = !hasStartedTag || (hasStartedTag && school.tags.includes('已开营'));
          const matchesEndedTag = !hasEndedTag || (hasEndedTag && school.tags.includes('已结营'));

          const otherTags = this.selectedFilters.filter(tag => tag !== '已开营' && tag !== '已结营');
          const matchesOtherTags = otherTags.length === 0 || otherTags.some(tag => school.tags.includes(tag));

          const matchesTags = matchesStartedTag && matchesEndedTag && matchesOtherTags;
          const matchesSearch = this.searchQuery === '' || school.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || school.institute.toLowerCase().includes(this.searchQuery.toLowerCase());

          return matchesTags && matchesSearch;
        })
        .map(school => {
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
        })
        .sort((a, b) => {
          if (a.timeRemaining === b.timeRemaining) {
            return a.name.localeCompare(b.name);
          }
          return a.timeRemaining - b.timeRemaining;
        });
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
    },
    showDetails(school) {
      this.$emit('show-details', school);
    }
  }
};
</script>

<style scoped>
#school-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0.5rem 0;
}

.school {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 0.8rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  height: 100%;
  cursor: pointer;
  overflow: hidden;
}

/* Dark mode styles */
.dark-mode #school-list .school {
  background: rgba(30, 30, 35, 0.9);
  border-color: rgba(70, 70, 80, 0.5);
}

.dark-mode #school-list .school.green {
  background: linear-gradient(135deg, rgba(30, 60, 40, 0.9), rgba(30, 30, 35, 0.9));
}

.dark-mode #school-list .school.red {
  background: linear-gradient(135deg, rgba(60, 30, 30, 0.9), rgba(30, 30, 35, 0.9));
}

.dark-mode #school-list .progress-container,
.dark-mode #school-list .text-countdown {
  background: rgba(40, 40, 50, 0.7);
}

.dark-mode #school-list .tags span {
  background: rgba(40, 40, 50, 0.8);
  border-color: rgba(70, 70, 80, 0.7);
}

.school-header {
  margin-bottom: 0.5rem;
}

.school h2 {
  margin: 0;
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 600;
  line-height: 1.3;
  display: flex;
  flex-direction: column;
}

.institute {
  font-size: 0.85rem;
  opacity: 0.8;
  font-weight: 500;
}

.school-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.description {
  max-height: 2.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.school p {
  margin: 0.3rem 0;
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.9;
  line-height: 1.4;
}

.school a {
  color: var(--primary-color);
  word-break: break-all;
  text-decoration: none;
  transition: var(--transition);
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.school-footer {
  margin-top: 0.6rem;
  align-self: stretch;
}

.school .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.5rem;
  max-height: 3.5rem;
  overflow: hidden;
}

.school .tags span {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid;
  white-space: nowrap;
}

.progress-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.text-countdown {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  text-align: center;
}

.school.green {
  background: linear-gradient(135deg, rgba(230, 255, 237, 0.9), rgba(255, 255, 255, 0.9));
}

.school.red {
  background: linear-gradient(135deg, rgba(255, 230, 230, 0.9), rgba(255, 255, 255, 0.9));
}

.school:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-color);
}

@media screen and (max-width: 1200px) {
  .school h2 {
    font-size: 0.95rem;
  }
  
  .institute {
    font-size: 0.8rem;
  }
  
  .school p {
    font-size: 0.8rem;
  }
  
  .text-countdown {
    font-size: 0.85rem;
  }
}

@media screen and (max-width: 900px) {
  #school-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
