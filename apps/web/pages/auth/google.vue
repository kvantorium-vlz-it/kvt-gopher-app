<script setup lang="ts">
const route = useRoute()
const { authenticateProvider, fetchUser } = useStrapiAuth()

// Обрабатываем callback от Google
onMounted(async () => {
  try {
    await authenticateProvider('google', route.query.access_token as string)
    await fetchUser() // Обновляем данные пользователя
    await navigateTo('/profile')
  } catch (error) {
    console.error('Ошибка авторизации:', error)
    await navigateTo('/login')
  }
})
</script>

<template>
  <div>Идёт авторизация...</div>
</template>