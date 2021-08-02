<template>
  <v-app>
    <v-main>
      <TheHeader v-if="isLogged" />
      <router-view />
      <Notification
        v-if="notification"
        :type="notification.type"
        :code="notification.code"
        :key="notification.message"
      />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Notification from './components/Notification';
import TheHeader from './components/TheHeader';
export default {
  name: 'App',
  components: {
    Notification,
    TheHeader,
  },

  computed: {
    ...mapGetters('auth', ['isLogged']),
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
