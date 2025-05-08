<script setup lang="ts">
import { EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { Swiper, SwiperSlide } from 'swiper/vue'

const props = defineProps<{
  id: string
}>()

const { find, findOne } = useStrapi()
const { fetchUser } = useStrapiAuth()

const city = await findOne('cities', props.id, {populate: { maps: { populate: ['locations'] }}})
const progressValues = ref<Record<string, number>>({})

// Клонируем слайды для корректной работы loop
const maps = ref([...city.data.maps])
const duplicatedMaps = ref([...city.data.maps, ...city.data.maps, ...city.data.maps])

const initialSlide = ref(city.data.maps.length) // Стартуем с середины дублированного массива
const swiperInstance = ref<any>(null)

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

onMounted(async () => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
  
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

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesPerView)
})

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
  // Корректируем позицию после инициализации
  setTimeout(() => {
    swiper.slideTo(initialSlide.value, 0)
  }, 50)
}

const onSlideChange = (swiper: any) => {
  // Если дошли до конца дублированных слайдов - незаметно переходим в середину
  if (swiper.activeIndex >= city.data.maps.length * 2) {
    swiper.slideTo(swiper.activeIndex - city.data.maps.length, 0, false)
  }
  // Если дошли до начала дублированных слайдов - незаметно переходим в середину
  else if (swiper.activeIndex < city.data.maps.length) {
    swiper.slideTo(swiper.activeIndex + city.data.maps.length, 0, false)
  }
}
</script>

<template>
  <swiper
    :modules="[EffectCoverflow]"
    :slides-per-view="slidesPerView"
    :centered-slides="true"
    :space-between="spaceBetween"
    :effect="'coverflow'"
    :loop="false"
    :initial-slide="initialSlide"
    :coverflow-effect="{
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
      slideShadows: false,
    }"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
  >
    <swiper-slide v-for="(map, index) in duplicatedMaps" :key="`${map.id}-${index}`">
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

.swiper-slide {
  transition: transform 0.3s ease;
}

.swiper-slide-active {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .swiper {
    padding: 10px 0;
  }
}
</style>