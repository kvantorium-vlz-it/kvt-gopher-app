

<script setup lang="ts">
    
    const router = useRouter()
    const { logout,fetchUser  } = useStrapiAuth()
    const { find,findOne,create  } = useStrapi()
    const response = ref()
    response.value = await find('locations')
    // console.log(JSON.stringify(response.value.data, null , 2)  );
    // onMounted(async()=>{
    //     const a = ref()
    //     a.value = await find('maps',{populate:['locations','image'],})
    //     console.log(JSON.stringify(a.value.data, null , 2)  );
     
    // })
    // const add = async () => {
    //     const { update,create } = useStrapi()
    //     await create('locations',  { name: 'My updated restaurant' })
    //     await create('maps',{
    //        name:'test',
    //         locations:['u33r8ro8l2e3lsnki90wx0gi']
    //     })
    // }

    const onLogout = async () => {
        logout()
        router.push('/login')
    }
    const get = async () => {

        const user = await fetchUser()
        console.log(user);
    
    }
</script>

<template>
    <div>
        <!-- <Map_2 :points="response"></Map_2>-->
        <Map :points="response.data"></Map>
        <!-- {{JSON.stringify(response.data, null , 2)  }}  -->
    </div>
    <button @click="onLogout">
        выйти
    </button>
    <button @click="get">
        получить
    </button>
    <!-- <button @click="add">+</button> -->
     


</template>

