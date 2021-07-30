<template>
  <div>
    <h1>Not Found</h1>
    <p>
      Oops we counld'nt find that page. Try going
      <router-link :to="{ name: 'Home' }">home</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style lang="scss" scoped></style>
