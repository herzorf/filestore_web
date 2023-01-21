import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routes from './routes/routes'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './routes/routes'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
