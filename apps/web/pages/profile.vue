

<script setup lang="ts">
    const router = useRouter()
    const { logout } = useStrapiAuth()
    const { find  } = useStrapi()
    const response = ref()
    response.value = await find('locations')


    const onLogout = async () => {
        logout()
        router.push('/login')
    }
    const get = async () => {
        const { fetchUser } = useStrapiAuth()

        const user = await fetchUser()
        console.log(user);
    
    }
</script>

<template>
    <div>
        <!-- <Map_2 :points="response"></Map_2>
        {{JSON.stringify(response,null, 2)  }} -->
        <Map :points="response.data"></Map>
    </div>
    <button @click="onLogout">
        выйти
    </button>
    <button @click="get">
        получить
    </button>


</template>

