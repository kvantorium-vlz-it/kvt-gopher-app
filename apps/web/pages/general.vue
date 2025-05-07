<script setup lang="ts">
const { find, findOne } = useStrapi()
const { fetchUser } = useStrapiAuth()

// Загружаем данные
const  cities  = await find('cities', {populate: { maps: { populate: ['locations'] }}})

// Создаем реактивный объект для хранения прогресса
const progressValues = ref<Record<string, number>>({})

// Вычисляем прогресс для всех карт сразу
onMounted(async () => {
  const user = await fetchUser()
  const userId = user.value?.documentId


  // Проходим по всем городам и картам
  for (const city of cities.data) {
    for (const map of city.maps) {
      const mapData = await findOne('maps', map.documentId, { populate: 'locations' })
      const progresses = await find('user-location-progresses', {
        filters: {
          users_permissions_user: { documentId: userId },
          location: { map: { documentId: map.documentId } }
        }
      })
      
      // Сохраняем результат
      progressValues.value[map.id] = Math.round(
        (progresses.data.length / mapData.data.locations.length) * 100
      )
    }
  }
})
</script>

<template>
  <div v-for="city in cities.data" :key="city.id">
    <h1>{{ city.name }}</h1>
    <div v-for="map in city.maps" :key="map.id">
      <h2>{{ map.name }}</h2>
      Пройдено: {{ progressValues[map.id] || 0 }}%
    </div>
  </div>
</template>


<style scoped>
div{
    border: 1px solid black;
    border-radius: 10px;
    margin: 5px;
}
</style>