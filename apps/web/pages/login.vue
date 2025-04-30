<script setup lang="ts">
 const { getProviderAuthenticationUrl } = useStrapiAuth()

const handleGoogleLogin = () => {
  window.location.href = getProviderAuthenticationUrl('google')
  
}

</script>

<template>
  <button @click="handleGoogleLogin">
    Войти через Google
  </button>

</template>