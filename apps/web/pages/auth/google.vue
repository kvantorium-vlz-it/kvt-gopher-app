<script setup lang="ts">
const route = useRoute()
const { params } = useRoute()
const CityId = params.id as string
const { authenticateProvider, fetchUser, logout } = useStrapiAuth()

// Обрабатываем callback от Google
onMounted(async () => {
  try {
    await authenticateProvider('google', route.query.access_token as string)
    await fetchUser() // Обновляем данные пользователя
    await navigateTo(`/general`)
  } catch (error) {
    console.error('Ошибка авторизации:', error)
    await navigateTo('/')
  }
})
</script>



<template>
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p class="loading-text">Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>
  </div>
</template>

<style scoped>


.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}


@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
}


.loading-text {
  margin-top: 30px;
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 2px;
}

.dot {
  display: inline-block;
  opacity: 0;
  animation: dots 1.5s infinite;
}
  
.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.5s; }
.dot:nth-child(3) { animation-delay: 1s; }
  
@keyframes dots {
  0%, 20% { opacity: 0; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-5px); }
  80%, 100% { opacity: 0; transform: translateY(0); }
}
</style>
