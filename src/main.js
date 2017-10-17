// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../node_modules/vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vuetify from 'vuetify';

import App from './App';
import router from './router';

Vue.use(Vuetify)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCRgtgFHekaN6I5u6jx5EufK9ivgE4Ibq8',
  }
})
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
