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

setData('cityId', city)


  
}
</script>

<template>
  
  <div class="welcome-container">
    <TwentyText class="welcome-title">ДОБРО ПОЖАЛОВАТЬ В НАЗВАНИЕИГРЫ!</TwentyText>
    
    <TwelveText class="welcome-text">Пожалуйста, выберите город, в котором мы начнём</TwelveText>
    
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
</template>

<style scoped>
.welcome-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
}

.welcome-title {
  font-size: 24px;
  margin-bottom: 24px;
  font-weight: 600;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.welcome-text {
  margin-bottom: 24px;
  color: #5c6c7c;
  font-size: 16px;
}

.select-container {
  margin-bottom: 24px;
}

.google-button {
  width: 100%;
}

@media (max-width: 480px) {
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
}
</style>