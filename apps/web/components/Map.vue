    <script setup lang="ts">
    import { shallowRef } from 'vue';
  
    import {
      YandexMap,
      YandexMapDefaultSchemeLayer,
      YandexMapDefaultFeaturesLayer,
      YandexMapDefaultMarker,
    } from 'vue-yandex-maps';
    import type { YMapDefaultMarker } from '@yandex/ymaps3-types/packages/markers';
import { NuxtLink } from '#components';
    
    interface Point {
        lat: number,
        lon: number,
    }
  
    const props = defineProps<{
      points: Point[]
      
    }>()
    const defaultMarker = shallowRef<YMapDefaultMarker | null>(null);
    const onDragMove = () => {
      triggerRef(defaultMarker);
    };
   

  
    </script>
<template>  
    <yandex-map
        
        :settings="{
          location: {
            center: [37.617644, 55.755819],
            zoom: 9,
          },
        }"
        width="100%"
        height="500px"
    >
      <yandex-map-default-scheme-layer/>
      <yandex-map-default-features-layer/>
   
          <yandex-map-default-marker
          v-model="defaultMarker"
          :settings="{
             
              coordinates: [37.617644, 55.755819],
              title: `Долгота: ${ defaultMarker?.coordinates[0].toFixed(2) }<br>Широта: ${ defaultMarker?.coordinates[1].toFixed(2) }`,
              draggable: true,
              onDragMove,
              onClick(event, mapEvent) {
                console.log(defaultMarker?.coordinates);
                
              },
              color:'green'
             
          }"
         />
          <Marcer v-for="point in props.points" 
          :id = "point.documentId"
          :coords="{
            lon: +point.lon,
            lat: +point.lat
            }",
            :mi="{
              lon:+defaultMarker?.coordinates[1]!,
              lat:+defaultMarker?.coordinates[0]!

            }"
          @select="( async(id:string) => {
            await navigateTo(`/location/${id}`)
          })"
         /> 
          
        
 
   
    </yandex-map>
</template>
  

<style scoped>
.marker-popup {
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  color: black;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.marker {
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  padding: 10px 20px;
  white-space: nowrap;
}

.popup {
  position: absolute;
  top: calc(100% + 10px);
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  color: black;
}
</style>