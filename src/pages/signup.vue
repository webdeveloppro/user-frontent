<template lang="pug">
  div
    if error
      h3 error
    form(v-on:submit="submit" action="#" method="post")
      input(type="email" v-model="data.email")
      br
      input(type="password" v-model="data.password")
      br
      input(type="submit" value="signup")
</template>

<script>
import Vue from 'vue';

export default {

  data() {
    return {
      fieldsDesc: [],
      data: {
        email: '',
        password: '',
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    Vue.http({ url: `${Vue.config.server.user}/signup`, method: 'options' }).then((res) => {
      if (res.status === 200) {
        next(vm => vm.setData(null, res.body));
      } else {
        next(vm => vm.setData(res.statusText, []));
      }
    }).catch((err) => {
      console.log('Error happens', err);
      console.debug(err);
    });
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate(to, from, next) {
    Vue.http({ url: `${Vue.config.server.user}/signup`, method: 'options', headers: { XREAL: true } }, (err, fieldsDesc) => {
      this.setData(err, fieldsDesc);
      next();
    });
  },
  watch: {
    $route() {
      Vue.http({ url: `${Vue.config.server.user}/signup`, method: 'options', headers: { XREAL: true } }, (err, fieldsDesc) => {
        this.setData(err, fieldsDesc);
      });
    },
  },
  methods: {
    setData(err, fieldsDesc) {
      if (err) {
        this.error = err.toString();
      } else {
        this.fieldsDesc = fieldsDesc;
      }
    },
    submit(e) {
      e.preventDefault();
      const h = {
        'Content-Type': 'application/json; charset=utf-8',
      };

      Vue.http.post(`${Vue.config.server.user}/signup`, JSON.stringify(this.data), { headers: h }).then((resp) => {
        if (resp.status === 201) {
        }
        console.log(resp);
      });
    },
  },
};
</script>
