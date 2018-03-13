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

<script lang="ts">
import Vue from 'vue';
import { Route } from 'vue-router';
import { Component, Watch } from 'vue-property-decorator';

// https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4
import axios, { AxiosResponse } from 'axios';

export type FieldData = {
  email: string;
  password: string;
};

@Component
export default class Signup extends Vue {
  fieldsDesc: Array<any>;
  data: FieldData;
  error: string;

  constructor() {
    super();
    this.fieldsDesc = [];
    this.error = '';
    this.data = {
      email: '',
      password: '',
    };
  }

  static beforeRouteEnter(to: Route, from: Route, next: any) {
    axios.request({ url: `${Vue.config.server.user}/signup`, method: 'options' }).then((res: AxiosResponse) => {
      if (res.status === 200) {
        next((vm: { setData:any } & Vue) => {
          vm.setData('', res.data);
        });
      } else {
        next((vm: { setData:any } & Vue) => {
          vm.setData(res.statusText, []);
        });
      }
    }).catch((err: Error) => {
      console.log('Error happens', err);
      console.debug(err);
    });
  }
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate(to: Route, from: Route, next: any) {
    axios.request({ url: `${Vue.config.server.user}/signup`, method: 'options' }).then((res: AxiosResponse) => {
      this.setData('', res.data);
      next();
    });
  }

  @Watch('$route')
  onRouteChange() {
    axios.request({ url: `${Vue.config.server.user}/signup`, method: 'options' }).then((res: AxiosResponse) => {
      this.setData('', res.data);
    });
  }

  setData(err:string, fieldsDesc:Array<any>) {
    if (err) {
      this.error = err.toString();
    } else {
      this.fieldsDesc = fieldsDesc;
    }
  }

  submit(e:Event) {
    e.preventDefault();
    const h:any = {
      'Content-Type': 'application/json; charset=utf-8',
    };

    axios.post(`${Vue.config.server.user}/signup`, JSON.stringify(this.data), { headers: h }).then((resp: AxiosResponse) => {
      if (resp.status === 201) {
        console.log('it works');
      }
      console.log(resp);
    });
  }
}
</script>
