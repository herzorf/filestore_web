import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routes from './routes/routes'
import { createRouter, createWebHashHistory, } from "vue-router"
const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(router)
app.mount('#app')
