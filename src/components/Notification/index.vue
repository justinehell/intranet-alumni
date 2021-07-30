<template>
  <div class="mx-auto" style="width:50%">
    <v-alert
      class=""
      :type="type.toLowerCase()"
      v-model="showError"
      dismissible
      elevation="2"
    >
      {{ $t(`${type}.${code}`) }}
    </v-alert>
  </div>
</template>

<script>
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
      showError: true,
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
