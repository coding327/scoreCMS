import { createApp } from 'vue'
import "./styles/index.scss"
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import MyTitle from './components/MyTitle.vue'

const app = createApp(App)
app.component('MyTitle', MyTitle)
app.use(router)
app.use(Antd)
app.use(createPinia())
app.mount('#app')
