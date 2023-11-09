import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/index.css'
import router from './components/router'; // 确保正确导入路由实例
const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')

// app.use(render)
// new Vue({
//     render: (h) => h(App),
//     router, // 添加路由
// }).$mount('#app');
