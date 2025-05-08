<script setup lang="ts">
const { params } = useRoute()
const {  fetchUser } = useStrapiAuth()
const { find, create, findOne } = useStrapi()

const locationId = params.id as string
const location = await findOne('locations', locationId, {
  populate:['map','game']
})

console.log(location.data.game.word);

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
      await navigateTo(`/map/${location.data.map.documentId}`)

      return
    }

    // 2. Если нет — создаём запись
    await create('user-location-progresses', {
      users_permissions_user: userId,
      location: locationId,
    })

    alert('Прогресс успешно добавлен')
    await navigateTo(`/map/${location.data.map.documentId}`)
  } catch (err) {
    console.error('Ошибка при создании прогресса:', err)
    alert('Произошла ошибка')
  }
}
</script>

<template>
  
  <Wordle :word="location.data.game.word" @game-over="createProgress"/>
  <!-- <button @click="createProgress">Прошёл</button> -->
</template>
