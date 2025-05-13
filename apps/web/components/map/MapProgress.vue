<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'

const progressValue = ref(0)
const props = defineProps<{
    progress: number,
    
  
  }>()

onMounted(() => {
  const timer = setTimeout(() => (progressValue.value = props.progress), 500)
  return () => clearTimeout(timer)
})
</script>

<template>
  <ProgressRoot
    v-model="progressValue"
    class="ProgressRoot"
  >
    <ProgressIndicator
      class="ProgressIndicator"
    />
  </ProgressRoot>
</template>


<style scoped>


.ProgressRoot {
  position: relative;
  overflow: hidden;
  background: rgba(242, 242, 242, 1);
  border-radius: 50px;
  width: 100%;
  height: 25px;
}

.ProgressIndicator {
  background-color: rgba(71, 125, 255, 1);
  width: 100%;
  height: 100%;
  border-radius: 50px;
}
</style>