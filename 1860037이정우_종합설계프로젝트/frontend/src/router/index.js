import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Fhome from '../views/fhome.vue'
import Location from '../views/location.vue'
import Reservation from '../views/reservation.vue'
import Reservate from '../views/reservate.vue'
import Member from '../views/Member.vue'
import Subscribe from '../views/Subscribe.vue'
//mport About2 from

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
      },
    {
    path: '/fhome',
    name: 'Fhome',
    component: Fhome
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/location',
    name: 'Location',
    component: Location
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: Reservation
  },
  {
    path: '/reservate',
    name: 'Reservate',
    component: Reservate
  },
  {
    path: '/member',
    name: 'Member',
    component: Member
  },

  {
    path: '/subscribe',
    name: 'Subscribe',
    component: Subscribe
  },
  {
    path: '/about',
    name: About,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
