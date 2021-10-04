import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import { mapActions } from 'vuex';
import { getLocalStorageItem } from './services/localStorage';

import PublicLayout from './layouts/PublicLayout.vue';
import AppLayout from './layouts/AppLayout.vue';

import './components/globalComponents';

Vue.component('public-layout', PublicLayout);
Vue.component('app-layout', AppLayout);

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  i18n,
  vuetify,
  created() {
    const accessToken = getLocalStorageItem('accessToken');
    const refreshToken = getLocalStorageItem('refreshToken');
    if (accessToken && refreshToken) {
      this.setAuthTokens({ accessToken, refreshToken });
    }
  },
  methods: {
    ...mapActions('auth', ['setAuthTokens']),
  },
  render: (h) => h(App),
}).$mount('#app');
