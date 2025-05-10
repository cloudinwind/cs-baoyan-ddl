<template>
  <div class="province-filter">
    <div class="filter-group">
      <span class="group-title">按省份筛选</span>
      <div class="filter-items">
        <button
          v-for="province in provinces"
          :key="province"
          :class="['tag-btn', { selected: selectedProvinces.includes(province) }]"
          @click="toggleProvince(province)"
        >
          {{ province }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProvinceFilterComponent',
  data() {
    return {
      provinces: [
        '北京', '上海', '江苏', '浙江', '广东', 
        '湖北', '四川', '陕西', '天津', '山东',
        '安徽', '福建', '湖南', '黑龙江', '辽宁', 
        '重庆', '河南', '河北', '吉林', '山西', 
        '江西', '贵州', '云南', '广西', '新疆', 
        '内蒙古', '甘肃', '宁夏', '青海', '西藏', 
        '海南'
      ],
      selectedProvinces: []
    };
  },
  methods: {
    toggleProvince(province) {
      const idx = this.selectedProvinces.indexOf(province);
      if (idx === -1) {
        this.selectedProvinces.push(province);
      } else {
        this.selectedProvinces.splice(idx, 1);
      }
      this.$emit('province-change', this.selectedProvinces);
    }
  }
};
</script>

<style scoped>
.province-filter {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.35rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  min-width: 200px;
  max-width: 400px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.group-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.2rem;
}

.filter-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag-btn {
  border: none;
  outline: none;
  background: #f4f8fc;
  color: var(--text-color);
  border-radius: 20px;
  padding: 0.25em 0.6em;
  font-size: 0.8em;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  margin-bottom: 0.15em;
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

/* Dark mode styles */
.dark-mode .province-filter {
  background: rgba(30, 30, 35, 0.5);
  border-color: var(--border-color);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.dark-mode .group-title {
  color: var(--text-color);
}

.dark-mode .tag-btn {
  background: #2d323c;
  color: #cfd8dc;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.dark-mode .tag-btn.selected {
  background: var(--primary-color);
  color: #fff;
  box-shadow: 0 2px 8px rgba(100,181,246,0.15);
}

.dark-mode .tag-btn:hover {
  background: #22304a;
  color: var(--primary-color);
}

.dark-mode .tag-btn.selected:hover {
  background: #1976d2;
  color: #fff;
}

@media (max-width: 768px) {
  .province-filter {
    width: 100%;
    max-width: none;
  }
  .filter-items {
    gap: 0.4rem;
  }
  .tag-btn {
    font-size: 0.8em;
    padding: 0.35em 0.7em;
  }
}
</style> 