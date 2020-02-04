import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import EditUser from '@/components/EditUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'users',
      component: Users
    },
    {
      path: '/user/:id',
      name: 'editUser',
      component: EditUser
    }
  ]
})
