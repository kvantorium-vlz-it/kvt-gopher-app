<script setup lang="ts">
  
import type { YMapDefaultMarker } from '@yandex/ymaps3-types/packages/markers';
  
  import {YandexMapDefaultMarker,} from 'vue-yandex-maps';
  
  const defaultMarker = shallowRef<YMapDefaultMarker | null>(null);

const props = defineProps<{
coords: {
  lon: number
  lat: number
 
},
}>()

const emit = defineEmits(['select'])

</script>

<template >
<yandex-map-default-marker

v-model="defaultMarker"
:settings="{
  coordinates: [props.coords.lat, props.coords.lon],
  popup: { position: 'top', hidesMarker: false, },
 
}"
        

>
<template  #popup="{close}"   >
  <div  class="popup" @click="close">
    <p><strong>Долгота:</strong> {{ props.coords.lat }}</p>
    <p><strong>Широта:</strong> {{ props.coords.lon }}</p>
    <button @click.stop="emit('select', defaultMarker?.coordinates )">Координаты</button>
  </div>
</template>
</yandex-map-default-marker>
</template>


<style scoped>
.popup {
background: #fff;
padding: 16px;
border-radius: 8px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
font-size: 14px;
font-family: sans-serif;
}
button {
margin-top: 10px;
width: 100%;
background: #4caf50;
color: white;
border: none;
padding: 8px;
border-radius: 4px;
cursor: pointer;
}
</style>
