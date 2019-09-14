import Vue from 'vue'
import App from './App.vue'
import router from './router'




import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

window.axios = require('axios/index').create({
  baseURL: 'http://127.0.0.1:5000/',
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
