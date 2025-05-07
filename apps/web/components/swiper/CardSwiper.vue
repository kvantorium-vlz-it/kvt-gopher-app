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

<script setup lang="ts">
import { EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

</script>