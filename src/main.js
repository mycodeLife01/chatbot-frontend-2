import './assets/main.css'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(FloatingVue, {
    themes: {
        'sidebar-tooltip': {
            $extend: 'tooltip',
            $resetCss: true,
        }
    }
})

app.mount('#app')
