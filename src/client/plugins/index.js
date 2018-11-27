import Vue from 'vue'
import axios from 'axios'
import iView from 'iview'
import mytoast from '~/components/toast'
import 'iview/dist/styles/iview.css'

const Toast = Vue.extend(mytoast)

const show = (text, duration = 2000) => {
  const toast = new Toast({
    el: document.createElement('div'),
    data() {
      return {
        text: text,
        showWrap: true,
        showContent: true
      }
    }
  })

  document.body.appendChild(toast.$el)

  setTimeout(_ => {
    toast.showContent = false
  }, duration - 250)
  setTimeout(_ => {
    toast.showWrap = false
  }, duration)
}

// 接口数据请求配置
Vue.prototype.$http = axios

// 自定义Vue组件
Vue.prototype.$toast = show

// 注册iview组件框架
Vue.use(iView)
