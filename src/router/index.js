import Vue from 'vue'
import Router from 'vue-router'
import ListMaker from '@/components/ListMaker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: ListMaker
    }
  ]
})
