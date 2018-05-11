import Vue from 'vue'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// 接口数据请求配置
Vue.prototype.$http = axios
Vue.use(iView)
