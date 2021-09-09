<template>
  <v-main>
    <TheHeader />

    <slot></slot>
  </v-main>
</template>

<script>
import TheHeader from '../components/TheHeader';
export default {
  name: 'AppLayout',
  components: {
    TheHeader,
  },
};
</script>
