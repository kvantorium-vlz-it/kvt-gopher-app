<script setup lang="ts">

</script>

<template>
  <NuxtPage />

  <div class="body">
    <TheHeader></TheHeader>
    <div class="kak-xochesh">
      <Menu></Menu>
      <CityArea />
      <Plots></Plots>
    </div>
    
    <CitySelect />
  </div>
  
</template>
<style scoped>
.kak-xochesh{
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 20px;
}
.body{
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>





