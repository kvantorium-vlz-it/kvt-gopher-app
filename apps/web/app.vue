<template>
  <div>
    <!-- <Map_2 :points="response"></Map_2>
    {{JSON.stringify(response,null, 2)  }} -->
    <Map :points="response.data"></Map>
  </div>

  <button @click="onClick">
    Войти через Google
  </button>
  <button @click="onLogout">
    Выйти
  </button>

</template>


<script setup lang="ts">
  const { find  } = useStrapi()
  const router = useRouter()
  const response = ref()
 response.value = await find('locations')
 const route = useRoute()
 const { authenticateProvider, fetchUser } = useStrapiAuth()

 const { getProviderAuthenticationUrl, logout } = useStrapiAuth()

const onClick =  async() => {
  window.location.href = getProviderAuthenticationUrl('google')
  await authenticateProvider('google', route.query.access_token as string)
  await fetchUser() // Обновляем данные пользователя
}
const onLogout = async () => {
  const { fetchUser } = useStrapiAuth()

  const user = await fetchUser()
  console.log(user);
  
}
</script>



