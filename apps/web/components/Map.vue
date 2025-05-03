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
   

          <Marcer v-for="point in props.points" 
          
          :coords="{
            lon: +point.lon,
            lat: +point.lat
            }"
          @select="((point_cords:any) => is_range(point_cords, defaultMarker?.coordinates, 500 ))"
         /> 
          
        
 
        <yandex-map-default-marker
        v-model="defaultMarker"
        :settings="{
            //Здесь вам НУЖНО брать координаты либо из функции onDragMove, либо из маркера, стриггерив реактивность
            //Яндекс при выполнении функции .update зачем-то подставляет оригинальные координаты, хотя они не менялись =(
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
    </yandex-map>
  </template>
  
  <script setup lang="ts">
  import { getDistance } from 'geolib';
  import { render, shallowRef } from 'vue';
  import type { YMap } from '@yandex/ymaps3-types';
  import {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultMarker,
  } from 'vue-yandex-maps';
  import type { YMapDefaultMarker } from '@yandex/ymaps3-types/packages/markers';
  
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
  function is_range(start:any, stop:any, def_range:number) { 
    const range = getDistance({lon: start[1],lat: start[0]}, {lon: stop[1], lat: stop[0]})
    console.log('я в радиусе 500м  ', range<= def_range ? true : false);

    
  }

  </script>

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