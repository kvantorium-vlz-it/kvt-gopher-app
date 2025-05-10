<script setup lang="ts">
import { getData, setData } from 'nuxt-storage/local-storage';

const { find, findOne } = useStrapi()
const cities = await find('cities')


 const hasSelection = ref(false)
const handleCitySelected = ({ city }) => {

setData('cityId', city, 1 , 'd')


  
}
</script>

<template>

    <div class="select-container">
      <ClothesSelect 
      />
    </div>
</template>

<style scoped>
.select-container {
  margin-bottom: 24px;
}

.google-button {
  width: 100%;
}

</style>