<template>
  <div class="progress-ring">
    <svg width="100" height="100">
      <circle class="progress-ring__circle-bg" cx="50" cy="50" r="40"></circle>
      <circle class="progress-ring__circle" :stroke-dasharray="circumference" :stroke-dashoffset="offset" cx="50" cy="50" r="40"></circle>
    </svg>
    <div class="progress-ring__label" style="color: black;">{{ labelName }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    progress: Number,
    num: [Number, String]
  },
  computed: {
    circumference() {
      return 2 * Math.PI * 40;
    },
    offset() {
      return this.circumference - (this.progress / 100) * this.circumference;
    },
    labelName() {
      return this.num === 'N/A' ? `${this.num}` : `${this.num} ${this.label}`;
    }
  }
};
</script>

<style scoped>
.progress-ring {
  width: 80px;
  position: relative;
  margin: 0.5rem;
  text-align: center;
  transition: var(--transition);
}

.progress-ring:hover {
  transform: scale(1.05);
}

.progress-ring svg {
  position: relative;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.progress-ring circle {
  fill: none;
  stroke-width: 8;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: var(--transition);
}

.progress-ring__circle-bg {
  stroke: var(--border-color);
  opacity: 0.3;
}

.progress-ring__circle {
  stroke: var(--primary-color);
  transition: stroke-dashoffset 0.3s ease;
}

.progress-ring__label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color);
  width: 100%;
  text-align: center;
  line-height: 1.2;
}

/* 为不同的标签添加不同的颜色 */
.progress-ring[data-label="days"] .progress-ring__circle {
  stroke: var(--primary-color);
}

.progress-ring[data-label="hours"] .progress-ring__circle {
  stroke: var(--success-color);
}

.progress-ring[data-label="minutes"] .progress-ring__circle {
  stroke: var(--warning-color);
}

.progress-ring[data-label="seconds"] .progress-ring__circle {
  stroke: var(--danger-color);
}

@media screen and (max-width: 768px) {
  .progress-ring {
    width: 70px;
  }

  .progress-ring__label {
    font-size: 0.75rem;
  }
}
</style>