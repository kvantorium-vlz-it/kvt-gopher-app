  
  <script setup lang="ts">
  import { EffectCoverflow } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/effect-coverflow'
  const props = defineProps<{
    id: string
  }>()
  
  const { find, findOne } = useStrapi()
  const { fetchUser } = useStrapiAuth()
  

  // Загружаем данные
  const  city  = await findOne('cities', props.id,{populate: { maps: { populate: ['locations'] }}})

  // Создаем реактивный объект для хранения прогресса
  const progressValues = ref<Record<string, number>>({})

  // Вычисляем прогресс для всех карт сразу
  onMounted(async () => {
    const user = await fetchUser()
    const userId = user.value?.documentId

    for (const map of city.data.maps) {
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
    
  })


  </script>



<template>
  <swiper
    :modules="[EffectCoverflow]"
    :slides-per-view="3"
    :centered-slides="true"
    :space-between="30"
    :effect="'coverflow'"
    :coverflow-effect="{
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
      slideShadows: false,
    }"
  >
    <swiper-slide v-for="item in 10" :key="item">
      <Plots />
    </swiper-slide>
  </swiper>
</template>