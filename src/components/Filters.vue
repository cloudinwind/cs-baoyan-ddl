<template>
  <div class="filters">
    <div class="filter-group">
      <span class="group-title">院校类型</span>
      <div class="filter-items">
        <button
          v-for="filter in schoolFilters"
          :key="filter"
          :class="['tag-btn', { selected: selectedFilters.includes(filter) }]"
          @click="toggleFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>
    </div>
    <div class="filter-group">
      <span class="group-title">状态</span>
      <div class="filter-items">
        <button
          v-for="filter in statusFilters"
          :key="filter"
          :class="['tag-btn', { selected: selectedFilters.includes(filter) }]"
          @click="toggleFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FiltersComponent',
  data() {
    return {
      schoolFilters: ['TOP2', '港三', '华五', 'C9', '985', '211', '双非', '四非', '研究院', '联培'],
      statusFilters: ['已开营', '已结营'],
      selectedFilters: []
    };
  },
  methods: {
    toggleFilter(filter) {
      const idx = this.selectedFilters.indexOf(filter);
      if (idx === -1) {
        this.selectedFilters.push(filter);
      } else {
        this.selectedFilters.splice(idx, 1);
      }
      this.$emit('filter-change', this.selectedFilters);
    }
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem;
  background: var(--secondary-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.group-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.3rem;
}

.filter-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.tag-btn {
  border: none;
  outline: none;
  background: #f4f8fc;
  color: var(--text-color);
  border-radius: 20px;
  padding: 0.45em 1.2em;
  font-size: 0.95em;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  margin-bottom: 0.2em;
}

.tag-btn.selected {
  background: var(--primary-color);
  color: #fff;
  box-shadow: 0 2px 8px rgba(74,144,226,0.12);
}

.tag-btn:hover {
  background: #e3f0fc;
  color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(74,144,226,0.10);
}

.tag-btn.selected:hover {
  background: #357ec7;
  color: #fff;
}

.dark-mode .filters {
  background: #23272f;
  border-color: #333a45;
}
.dark-mode .tag-btn {
  background: #2d323c;
  color: #cfd8dc;
}
.dark-mode .tag-btn.selected {
  background: var(--primary-color);
  color: #fff;
}
.dark-mode .tag-btn:hover {
  background: #22304a;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .filters {
    padding: 0.7rem;
    gap: 0.7rem;
  }
  .filter-items {
    gap: 0.4rem;
  }
  .tag-btn {
    font-size: 0.85em;
    padding: 0.35em 0.9em;
  }
}
</style>