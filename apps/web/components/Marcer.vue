<script setup lang="ts">
    import { getDistance } from 'geolib';
  
import type { YMapDefaultMarker } from '@yandex/ymaps3-types/packages/markers';
  
  import {YandexMapDefaultMarker,} from 'vue-yandex-maps';
  
  const defaultMarker = shallowRef<YMapDefaultMarker | null>(null);

const props = defineProps<{
  id: string
coords: {
  lon: number
  lat: number
 
}, mi: {
    lon: number
    lat: number
  }
}>()

const emit = defineEmits(['select'])
function is_range( def_range:number) { 
      const range = getDistance({lon: props.coords.lon,lat: props.coords.lat}, {lon: props.mi.lon, lat: props.mi.lat})
    
      return range<= def_range ? true : false
    }
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

    <button v-if="is_range(500)" @click.stop="emit('select', id )">Координаты</button>
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
