// Make sure to register before importing any components
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import router from './router';

Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //  Error in render: "TypeError: Cannot read property 'matched' of undefined"
  /*
  render(h) {
    return h(App)
  }, 
  */
 template: '<div><router-view></router-view></div>',
});
