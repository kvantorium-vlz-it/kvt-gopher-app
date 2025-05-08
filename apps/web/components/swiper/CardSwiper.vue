<script setup lang="ts">
  import { EffectCoverflow } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/effect-coverflow'
  const props = defineProps<{
    id: string
  }>()
  
  const { find, findOne } = useStrapi()
  const { fetchUser } = useStrapiAuth()
  

 
  const  city  = await findOne('cities', props.id,{populate: { maps: { populate: ['locations'] }}})

  const progressValues = ref<Record<string, number>>({})

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
      progressValues.value[map.id] = Math.round(
        (progresses.data.length / mapData.data.locations.length) * 100
      )
    }
    
  })


  const slidesPerView = ref(3)
const spaceBetween = ref(30)

const updateSlidesPerView = () => {
  if (window.innerWidth < 768) {
    slidesPerView.value = 1
    spaceBetween.value = 20
  } else if (window.innerWidth < 1024) {
    slidesPerView.value = 2
    spaceBetween.value = 25
  } else {
    slidesPerView.value = 3
    spaceBetween.value = 30
  }
}

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesPerView)
})

const onSwiper = (swiper: any) => {
  swiper.loopCreate()
}


  </script>



<template>
  <swiper
  :modules="[EffectCoverflow]"
    :slides-per-view="slidesPerView"
    :centered-slides="true"
    :space-between="spaceBetween"
    :effect="'coverflow'"
    :loop="true"
    :coverflow-effect="{
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
      slideShadows: false,
    }"
    @swiper="onSwiper"
  >
    <swiper-slide v-for="map in city.data.maps" :key="map.id">
      <Plots 
      :id="map.documentId"
      :title="map.name"
      :description="map.description"
      :percent="progressValues[map.id] || 0"
      
      />
    </swiper-slide>
  </swiper>
</template>


<style scoped>
.swiper {
  width: 100%;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .swiper {
    padding: 10px 0;
  }
}
</style> 