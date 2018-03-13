import Vue from 'vue';
import Router from 'vue-router';
import Signup from '@/pages/signup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Signup,
    },
  ],
});
