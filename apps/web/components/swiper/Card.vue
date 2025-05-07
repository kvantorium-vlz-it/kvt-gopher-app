<template>
  <div class="card">
    <h2 class="card-title">Card Title</h2>
    <p class="card-content">Card content goes here</p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.card-content {
  color: #666;
  line-height: 1.5;
}
</style>