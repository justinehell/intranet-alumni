import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import { getLocalStorage } from './services/localStorage';
import { mapActions } from 'vuex';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  i18n,
  vuetify,
  created() {
    const accessToken = getLocalStorage('accessToken');
    const refreshToken = getLocalStorage('refreshToken');
    this.setAuthTokens({ accessToken, refreshToken });
  },
  methods: {
    ...mapActions('auth', ['setAuthTokens']),
  },
  render: (h) => h(App),
}).$mount('#app');
