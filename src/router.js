import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Knjige from './views/Knjige'
import NovaKnjiga from "./views/NovaKnjiga";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/knjige',
      name: 'knjige',
      component: Knjige,
      props: true
    },
    {
      path: '/nova-knjiga',
      name: 'novaKnjiga',
      component: NovaKnjiga,
      props: true
    }
  ]
})
