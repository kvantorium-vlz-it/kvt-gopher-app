<template>
  <div>
    <!-- <Map_2 :points="response"></Map_2>
    {{JSON.stringify(response,null, 2)  }} -->
    <Map :points="response.data"></Map>
  </div>
</template>

<script setup lang="ts">
  const { find } = useStrapi()

  const response = ref()
 response.value = await find('locations')
console.log(JSON.stringify(response.value.data,null, 2) );
const { authenticateProvider } = useStrapiAuth()
const route = useRoute()

await authenticateProvider('google', route.query.access_token)

</script>

