<template>
  <div class="container">
    <div :class="{ 'blur-background': selectedSchool }">
      <HeaderComponent @source-change="onSourceChange" @toggle-countdown="onToggleCountdown"></HeaderComponent>
      <div class="main-container">
        <FiltersComponent @filter-change="onFilterChange"></FiltersComponent>
        <div class="search-province-container">
          <SearchComponent @search="onSearch"></SearchComponent>
          <ProvinceFilterComponent @province-change="onProvinceChange"></ProvinceFilterComponent>
        </div>
        <SchoolList 
          :schools="schools" 
          :selectedFilters="selectedFilters" 
          :selectedProvinces="selectedProvinces" 
          :searchQuery="searchQuery" 
          :countdownType="countdownType" 
          @show-details="showDetails"
        ></SchoolList>
      </div>
    </div>
    <div v-if="selectedSchool" class="overlay" @click="hideDetails"></div>
    <DetailsCard v-if="selectedSchool" :school="selectedSchool" :countdownType="countdownType"></DetailsCard>
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue';
import FiltersComponent from '../components/Filters.vue';
import SearchComponent from '../components/Search.vue';
import ProvinceFilterComponent from '../components/ProvinceFilter.vue';
import SchoolList from '../components/SchoolList.vue';
import DetailsCard from '../components/DetailsCard.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    FiltersComponent,
    SearchComponent,
    ProvinceFilterComponent,
    SchoolList,
    DetailsCard
  },
  data() {
    return {
      schools: [],
      selectedFilters: [],
      selectedProvinces: [],
      searchQuery: '',
      currentSource: 'camp2025',
      selectedSchool: null,
      countdownType: 'text' // 初始倒计时类型
    };
  },
  methods: {
    loadData(source) {
      fetch('/config/schools.json')
      // fetch('/config/schools.json')
        .then(response => response.json())
        .then(data => {
          this.schools = data[source];
          this.updateSelectedSchool();
        });
    },
    onSourceChange(source) {
      this.currentSource = source;
      this.loadData(source);
    },
    onFilterChange(filters) {
      this.selectedFilters = filters;
    },
    onProvinceChange(provinces) {
      this.selectedProvinces = provinces;
    },
    onSearch(query) {
      this.searchQuery = query;
    },
    showDetails(school) {
      this.selectedSchool = school;
    },
    hideDetails() {
      this.selectedSchool = null;
    },
    onToggleCountdown(type) {
      this.countdownType = type;
    },
    updateSelectedSchool() {
      if (this.selectedSchool) {
        const updatedSchool = this.schools.find(school => school.name === this.selectedSchool.name && school.institute === this.selectedSchool.institute);
        if (updatedSchool) {
          this.selectedSchool = updatedSchool;
        }
      }
    }
  },
  mounted() {
    this.loadData(this.currentSource);
    this.intervalId = setInterval(() => {
      this.loadData(this.currentSource);
    }, 1000); // 10秒更新一次
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  }
};
</script>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  background-color: var(--secondary-color);
  transition: var(--transition);
}

.blur-background {
  filter: blur(8px);
  pointer-events: none;
  transition: var(--transition);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

.search-province-container {
  display: flex;
  gap: 0.8rem;
  align-items: stretch;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

@media screen and (max-width: 1024px) {
  .search-province-container {
    flex-direction: column;
    gap: 1rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.main-container {
  padding: 2rem 18%;
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
}

@media screen and (max-width: 1400px) {
  .main-container {
    padding: 2rem 10%;
  }
}

@media screen and (max-width: 1024px) {
  .main-container {
    padding: 2rem 5%;
  }
}

@media screen and (max-width: 768px) {
  .main-container {
    padding: 1rem 5%;
    gap: 1rem;
  }
}

/* Dark mode specific styles */
.dark-mode .container {
  background-color: var(--secondary-color);
}

/* 添加滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--secondary-color);
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}
</style>

