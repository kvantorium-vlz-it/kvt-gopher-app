<script setup lang="ts">
const { params } = useRoute()
const {  fetchUser } = useStrapiAuth()
const { find, create } = useStrapi()

const locationId = params.id

async function createProgress() {
    const user = await fetchUser()
    const userId = user.value?.documentId
  try {
    // 1. Проверка, существует ли уже такая связка
    const existing = await find('user-location-progresses', {
      filters: {
        users_permissions_user: { documentId: { $eq: userId } },
        location: { documentId: { $eq: locationId } },
      },
    })

    if (existing?.data?.length > 0) {
      console.warn('Прогресс уже существует')
      alert('Вы уже проходили эту локацию')
      await navigateTo('/profile')

      return
    }

    // 2. Если нет — создаём запись
    await create('user-location-progresses', {
      users_permissions_user: userId,
      location: locationId,
    })

    alert('Прогресс успешно добавлен')
    await navigateTo('/profile')
  } catch (err) {
    console.error('Ошибка при создании прогресса:', err)
    alert('Произошла ошибка')
  }
}
</script>

<template>
  <button @click="createProgress">Прошёл</button>
</template>
