import { createApp } from 'vue'
import "./styles/index.scss"
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
