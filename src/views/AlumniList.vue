<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1>
          {{ $t('alumniList.title') }}
        </h1>
      </v-col>
    </v-row>

    <v-row v-if="students">
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="student in students"
        :key="student.id"
      >
        <v-card
          class="pa-2"
          @click="
            $router.push({
              name: 'AlumniDetail',
              params: { id: student.id },
            })
          "
        >
          <v-card-title>
            {{ `${student.firstName} ${student.lastName}` }}
          </v-card-title>
          <v-card-text>
            {{ $t('alumniList.promo') }} :
            <span class="text--primary">{{
              $t(`PROMO.${student.promo}`)
            }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'AlumniList',
  computed: {
    ...mapState('students', ['students']),
  },
  created() {
    this.$store.dispatch('students/getStudents');
  },
};
</script>

<style lang="scss" scoped></style>
