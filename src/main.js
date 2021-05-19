import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
/* Fonts Awesome */
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* Bootstrap */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(fas, far)
dom.watch()

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
