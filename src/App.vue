<template lang="pug">
div#app
  div.navigation(v-model="sideNav" absolute temporary light)
    ul
      li(v-for="item in menuItems"
        :key="item.title"
        to="item.link")
        a(:href="item.link")
          i(:class="'fa-icon fa-' + item.icon") {{ item.title }}
  div#content
    <router-view></router-view>
</template>

<script>
import Vue from 'vue';

Vue.config.server = {};
Vue.config.server.user = 'http://127.0.0.1:8082';

export default {
  data() {
    return {
      sideNav: false,
    };
  },
  computed: {
    menuItems() {
      const menuItems = [
        { icon: 'home', title: 'Home', link: '/' },
        { icon: 'face', title: 'Sign Up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
      ];
      return menuItems;
    },
  },
};
</script>
