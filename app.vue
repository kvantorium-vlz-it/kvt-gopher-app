<script setup lang="ts">
const points = await $fetch('/api/points')

onMounted(() => console.log(points))
</script>

<template>
    <div>
        <div v-for="point in points">
            {{ point.id }} : {{ point.latitude }}| {{ point.longitude }}
        </div>
    </div>
</template>
