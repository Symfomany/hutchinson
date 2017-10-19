import Detail from '@/components/Detail';
import List from '@/components/List';
import Main from '@/components/Main';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'map',
      component: Main
    },
    {
      path: '/list/:id?',
      name: 'list',
      component: List
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
  ]
})
