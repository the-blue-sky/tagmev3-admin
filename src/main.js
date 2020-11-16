import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import './assets/css/global.css'
import './plugins/element'
// 不引入elementui样式不生效
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:10000/api/'
// axios.defaults.baseURL = '/api'
// 对所有请求添加token头
axios.interceptors.request.use(request => {
    request.headers.token = window.sessionStorage.getItem('token')
    return request;
})
Vue.prototype.axios = axios

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
