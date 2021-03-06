import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Albums from "@/views/Albums";
import Album from "@/views/Album";
import SignUp from "@/views/SIgnUp";
import {Auth} from 'aws-amplify'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: Album,
    meta:{requiresAuth:true} // needs authorization for this route.
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums,
    meta:{requiresAuth:true} // needs authorization for this route.
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = await Auth.currentUserInfo();

  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next()
  }

})

export default router
