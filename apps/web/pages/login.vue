<script setup lang="ts">
 const { getProviderAuthenticationUrl } = useStrapiAuth()

const handleGoogleLogin = () => {
  window.location.href = getProviderAuthenticationUrl('google')
  
}

</script>

<template>
  <button @click="handleGoogleLogin">
    Войти через Google
  </button>
  <div class="app">
    <swiperCardSwiper />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  padding: 20px;
}
</style>