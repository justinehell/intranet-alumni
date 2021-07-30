<template>
  <div class="mx-auto" style="width:50%">
    <v-alert
      class=""
      :type="type"
      v-model="showError"
      dismissible
      elevation="2"
    >
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    alert: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showError: this.alert,
      timeout: null,
    };
  },
  watch: {
    showError(val) {
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

<style lang="scss" scoped></style>
