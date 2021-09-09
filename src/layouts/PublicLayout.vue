<template>
  <v-main class="public-bg pt-8">
    <slot></slot>
  </v-main>
</template>

<script>
export default {
  name: 'PublicLayout',
};
</script>
<style>
.public-bg {
  background-image: url('~@/assets/images/public_bg.jpg');
  background-size: auto;
}
</style>
