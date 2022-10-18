// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  plugins: ['@/plugins/ant-design-vue'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/reset.scss";\
            @import "@/assets/scss/base.scss";`,
        },
      },
    },
  },
})
