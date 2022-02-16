import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/css/style.css'
import './assets/css/bootstrap.min.css';
// import './assets/js/bootstrap.min.js'
import './plugins/axios'
import store from './store/store'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')