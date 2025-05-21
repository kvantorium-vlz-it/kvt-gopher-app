<template>
   <div class="stat-item">
      <TwelveText class="stat-label">{{ text }}</TwelveText>
      <ThirtyText class="stat-number">{{number}}</ThirtyText>
    </div>
</template>
  
  <script setup lang="ts">
  defineProps<{
    /**
     * название статики
     */
    text: string,
    /**
     * количество в статистике
     */
    number: number,
  
  }>()
  </script>
  
  <style scoped>
  
.stat-item {
  text-align: center;
}

.stat-label {
  color: #888;
  margin-bottom: 4px;
}

.stat-number {
  line-height: 1;
}
  </style>