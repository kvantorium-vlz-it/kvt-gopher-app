// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'vue-yandex-maps/nuxt',
    '@nuxtjs/strapi'
  ],
  yandexMaps: {
    apikey: '4b0f1bee-9061-4bf4-b1e1-6284de405188',
  },
  strapi: {
    url: 'http://localhost:1337',
    token: 'f94881899af493613fe2e9fad5caa7b16aaa132da36e0634e8572e80a30ed9c8af11880d9a78b76bad98b7ad9143cde5d50dc7a7124dadd35d079b93196595421a79f1579b0b5eb37c8569e33ceab896235150fb616a626cbffffd72c8b0d3c3909fe3b39cb6f14e142d9abadca41939b9942aabaa9a5e6598c16528c8378603'
  },
})