// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components:{
    dirs: [
      {
        path: './components',
        pathPrefix: false,
      }
    ]
  },
  devtools: { enabled: false },
  css: ['~/assets/index.css','@/assets/css/fonts.css'],
  modules: [
    'vue-yandex-maps/nuxt',
    '@nuxtjs/strapi',
    'nuxt-swiper',
    '@nuxt/icon'
  ],
  yandexMaps: {
    apikey: '4b0f1bee-9061-4bf4-b1e1-6284de405188',
  },
  strapi: {
    url: 'http://localhost:1337',
    auth: {
      populate: ['role'] // Какие поля подгружать у пользователя
    }
  },
})
