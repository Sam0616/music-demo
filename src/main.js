import {createApp} from 'vue'
import App from './App.vue'
// eslint-disable-next-line no-unused-vars
import $ from 'jquery'
// eslint-disable-next-line no-unused-vars
import jQuery from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min'


import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')

