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
</template>

<script lang="ts">
import Vue from 'vue';

// Todo
// Create d.ts with server var for interface VueConfiguration
Vue.config.server = {
  user: 'http://127.0.0.1:8082',
};

export type Menu = {
  icon: string;
  title: string;
  link: string;
};

export default class App extends Vue {
  sideNav: boolean

  constructor() {
    super();
    this.sideNav = false;
  }

  menuItems(): Menu[] {
    return [
      { icon: 'home', title: 'Home', link: '/' },
      { icon: 'face', title: 'Sign Up', link: '/signup' },
      { icon: 'lock_open', title: 'Sign In', link: '/signin' },
    ];
  }
};
</script>
