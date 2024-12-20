// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
        'radix-vue/nuxt',
        '@nuxtjs/tailwindcss',
        '@prisma/nuxt',
    ],

    vite: {
      resolve: {
         alias: {
           ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
        }
      }
    }
})
