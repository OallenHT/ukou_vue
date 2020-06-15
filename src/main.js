import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import captcha from 'vue-social-captcha'
import 'vue-beauty/package/style/vue-beauty.min.css'
import vueBeauty from 'vue-beauty'





Vue.config.productionTip = false;
Vue.use(captcha);
Vue.use(vueBeauty);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
