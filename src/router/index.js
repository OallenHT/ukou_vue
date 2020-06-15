import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeIndex from '../views/home/Index'
import CnAnimeIndex from '../views/cnAnime/Index'
import JpAnimeIndex from '../views/jpAnime/Index'
import HotIndex from '../views/hot/Index'

import Login from '../views/user/Login'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeIndex
    },
    {
      path: '/jpAnime',
      name: 'JpAnime',
      component: JpAnimeIndex
    },
    {
      path: '/cnAnime',
      name: 'CnAnime',
      component: CnAnimeIndex
    },
    {
      path: '/hot',
      name: 'Hot',
      component: HotIndex
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
]

const router = new VueRouter({
  routes
})

export default router
