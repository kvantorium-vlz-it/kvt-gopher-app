<script setup lang="ts">
const route = useRoute()
const { authenticateProvider, fetchUser } = useStrapiAuth()

// Обрабатываем callback от Google
onMounted(async () => {
  try {
    await authenticateProvider('google', route.query.access_token as string)
    await fetchUser() // Обновляем данные пользователя
    await navigateTo('/general')
  } catch (error) {
    console.error('Ошибка авторизации:', error)
    await navigateTo('/')
  }
})
</script>

<template>
  <div>Идёт авторизация...</div>
</template>