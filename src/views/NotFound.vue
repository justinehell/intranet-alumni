<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1>{{ $t('notFound.title') }}</h1>
        <p>
          {{ $t('notFound.description') }}
          <router-link :to="{ name: 'Home' }">{{
            $t('home.title')
          }}</router-link>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style lang="scss" scoped></style>
