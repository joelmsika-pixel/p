import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Me from '../views/Me.vue'
import MySkills from '../views/MySkills.vue'
import Projects from '../views/Projects.vue'
import Testimonials from '../views/Testimonials.vue'
import Rewards from '../views/Rewards.vue'
import Contact from '../views/Contact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return false
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
    },
    {
      path: '/my-skills',
      name: 'my-skills',
      component: MySkills,
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
    },
    {
      path: '/testimonials',
      name: 'testimonials',
      component: Testimonials,
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: Rewards,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
  ],
})

export default router
