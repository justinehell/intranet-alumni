<template>
  <v-app>
    <component :is="layout">
      <router-view />
      <!-- <router-view :layout.sync="layout"/> -->
    </component>

    <Notification
      v-if="notification"
      :type="notification.type"
      :code="notification.code"
      :key="notification.message"
    />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Notification from './components/Notification';

const DEFAULT_LAYOUT = 'public';

export default {
  name: 'App',
  components: {
    Notification,
  },
  computed: {
    ...mapGetters('auth', ['isLogged']),
    layout() {
      return (this.$route.meta.layout || DEFAULT_LAYOUT) + '-layout';
    },
    notification() {
      return this.$store.state.notifications.notifications;
    },
  },
  created() {
    this.isLogged ? this.setInitialData() : null;
  },
  methods: {
    ...mapActions(['setInitialData']),
  },
};
</script>
<style>
.public-bg {
  background-image: url('~@/assets/images/public_bg.jpg');
  background-size: cover;
}
</style>
