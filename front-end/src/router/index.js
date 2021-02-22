import Vue from 'vue'
import Router from 'vue-router'
import Chatting from '@/components/Chatting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chatting',
      component: Chatting
    }
  ]
})
