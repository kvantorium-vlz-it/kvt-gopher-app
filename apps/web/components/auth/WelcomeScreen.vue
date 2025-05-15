<script setup lang="ts">
import { getData, setData } from 'nuxt-storage/local-storage';
const { getProviderAuthenticationUrl } = useStrapiAuth()

const handleGoogleLogin = () => {
  window.location.href = getProviderAuthenticationUrl(`google/`)
}
const { find, findOne } = useStrapi()
const cities = await find('cities')


 const hasSelection = ref(false)
const handleCitySelected = ({ city }) => {
setData('cityId', city, 1 , 'd')
}
</script>

<template>
  
  <div class="welcome-container">
    <div class="container-text">
      <TwentyText class="welcome-title">ДОБРО ПОЖАЛОВАТЬ В НАЗВАНИЕИГРЫ!</TwentyText>
      <TwelveText class="welcome-text">Пожалуйста, выберите город, в котором мы начнём</TwelveText>
    </div>
    <div class="container-select">
        <div class="select-container">
        <CitySelect 
          :cities="cities.data"
          v-model:hasSelection="hasSelection"
          @citySelected="handleCitySelected"
        />
      </div>

      <ButtonAction class="google-button" @click="handleGoogleLogin" :disabled="!hasSelection">
        ВОЙТИ С GOOGLE
      </ButtonAction>
    </div>
    
    
  </div>
</template>

<style scoped>
.container-select{
display: flex;
flex-direction: column;
gap: 16px;
}
.container-text{
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 20px;
}
.welcome-container {
  padding: 16px;
  text-align: center;
  background: white;
  border-radius: 16px;
  width: 322px;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}




.google-button {
  width: 100%;
}

/* @media (max-width: 480px) {
  .welcome-container {
    padding: 20px;
    margin: 0;
    border-radius: 8px;
  }

  .welcome-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .welcome-text {
    font-size: 14px;
    margin-bottom: 20px;
  }
} */
</style>