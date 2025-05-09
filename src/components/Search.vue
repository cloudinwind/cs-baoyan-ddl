<template>
  <div class="search-container">
    <input type="text" v-model="searchQuery" @input="onSearch" placeholder="搜索学校或学院..." class="search-input">
    <button @click="clearSearch" class="clear-search">清空搜索</button>
  </div>
</template>

<script>
export default {
  name: 'SearchComponent',
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery);
    },
    clearSearch() {
      this.searchQuery = '';
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.search-container:focus-within {
  box-shadow: 0 0 0 2px var(--primary-color);
  background: rgba(255, 255, 255, 0.8);
}

.search-input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  width: 300px;
  max-width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-color);
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.search-input::placeholder {
  color: var(--text-color);
  opacity: 0.6;
}

.clear-search {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.clear-search:hover {
  background-color: var(--primary-color);
  opacity: 0.9;
  transform: translateY(-1px);
}

.clear-search:active {
  transform: translateY(0);
}

@media screen and (max-width: 768px) {
  .search-container {
    flex-direction: column;
    width: 100%;
    padding: 1rem;
  }

  .search-input {
    width: 100%;
  }

  .clear-search {
    width: 100%;
    justify-content: center;
  }
}
</style>
