<script setup lang="ts">
const containerRef = ref(null)
const swiper = useSwiper(containerRef)

const slides = ref(Array.from({ length: 10 }))
</script>

<template>
    <ClientOnly>
        <swiper-container
            class="swiper-basic"
            :loop="true"
        >
            <swiper-slide
                v-for="(slide, index) in slides"
                :key="`slide-basic-${index}`"
                class="swiper-slide"
            >
                {{ index }}
            </swiper-slide>
        </swiper-container>
    </ClientOnly>
</template>

<style scoped>
.swiper-slide {
    aspect-ratio: 1;
    background: lightgray;
}
</style>