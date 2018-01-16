import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/app-main/app-main.vue'
import Card from '@/components/card/app-card.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/card',
      name: 'Main',
      component: Card
    }
  ],
  mode: 'history'
})
