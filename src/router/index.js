import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import Signup from '@/pages/signup';

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
  ],
});
