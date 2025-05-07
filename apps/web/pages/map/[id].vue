

<script setup lang="ts">
    const { params } = useRoute()
    const router = useRouter()
    const { logout,fetchUser  } = useStrapiAuth()
    const { find,findOne,create  } = useStrapi()
    const response = ref()
    const MapId = params.id as string
    response.value = await findOne('maps',MapId,{
        populate:['Locations']
    })
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


</script>

<template>
    <div>
        <Map :points="response.data.locations"></Map>
    </div>
</template>

