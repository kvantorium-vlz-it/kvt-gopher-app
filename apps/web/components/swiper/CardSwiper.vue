<script setup lang="ts">
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const props = defineProps<{
  id: string
}>()

const { find, findOne } = useStrapi()
const { fetchUser } = useStrapiAuth()

const city = await findOne('cities', props.id, { populate: { maps: { populate: ['locations'] }} })
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
    slidesPerView.value = 1.2
    spaceBetween.value = 20
  } else if (window.innerWidth < 1024) {
    slidesPerView.value = 2.2
    spaceBetween.value = 25
  } else {
    slidesPerView.value = 3.2
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
  <div class="swiper-wrapper">
    <div class="swiper-container">
      <swiper
        :modules="[Autoplay]"
        :slides-per-view="slidesPerView"
        :space-between="spaceBetween"
        :loop="true"
        :grab-cursor="true"
        :centered-slides="true"
        :initial-slide="1"
        @swiper="onSwiper"
      >
        <swiper-slide v-for="map in city.data.maps" :key="map.id" class="swiper-slide">
          <Plots 
            :id="map.documentId"
            :title="map.name"
            :description="map.description"
            :percent="progressValues[map.id] || 0"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped>
.swiper-wrapper {
  width: 100%;
}

.swiper-container {
  width: 100vw;
}

.swiper {
  overflow: visible;
  width: 100%;
  position: relative;
}

.swiper-slide {
  transition: all 0.3s ease;
  opacity: 0.7;
  transform: scale(0.95);
}

.swiper-slide-active {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 768px) {
  .swiper-wrapper {
    overflow: hidden;
  }
  
  .swiper-container {
  
    overflow: hidden;
  }
  
  .swiper {
    padding: 0px 16px;
    overflow: hidden;
  }
  
  .swiper-slide {
    transform: scale(0.9);
  }
}
</style>