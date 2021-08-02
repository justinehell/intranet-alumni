<template>
  <div class="mx-auto">
    <v-snackbar app v-model="visible" :color="color" timeout="-1">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ icon }}</v-icon>
        <v-layout>
          <div>{{ text }}</div>
        </v-layout>
        <v-btn icon @click="visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-layout>
    </v-snackbar>
  </div>
</template>

<script>
import { NOTIFICATION } from '../../utils/notifications';
export default {
  name: 'Notification',
  props: {
    type: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
      color: this.type.toLowerCase(),
      visible: true,
    };
  },
  computed: {
    text() {
      return this.$t(`${this.type}.${this.code}`);
    },
    icon() {
      switch (this.type) {
        case NOTIFICATION.ERROR:
          return 'mdi-alert-circle';
        case NOTIFICATION.INFO:
          return 'mdi-information';
        case NOTIFICATION.SUCCESS:
          return 'mdi-check-circle';
        case NOTIFICATION.WARNING:
          return 'mdi-alert';
      }
      return null;
    },
  },
  watch: {
    visible(val) {
      if (!val) {
        this.$store.dispatch('notifications/removeNotification', null);
      }
    },
  },

  created() {
    this.timeout = setTimeout(() => {
      this.$store.dispatch('notifications/removeNotification', null);
    }, 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>
