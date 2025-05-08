<template>
   <div class="stat-item">
      <div class="stat-label">{{ text }}</div>
      <div class="stat-number">{{number}}</div>
    </div>
</template>
  
  <script setup lang="ts">
  defineProps<{
    text: string,
    number: string,
  
  }>()
  </script>
  
  <style scoped>
  
.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 14px;
  color: #888;
  margin-bottom: 4px;
}

.stat-number {
  font-size: 48px;
  font-weight: bold;
  line-height: 1;
}
  </style>