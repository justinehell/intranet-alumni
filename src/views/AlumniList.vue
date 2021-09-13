<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1>
          {{ $t('alumniList.title') }}
        </h1>
      </v-col>
    </v-row>

    <v-row v-if="students" class="mb-4">
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
      <v-btn
        @click="loadMore"
        class="ma-4"
        :disabled="areAllStudentsDisplayed"
        >{{ $t('action.loadMore') }}</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
  name: 'AlumniList',
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState('students', ['students', 'totalStudents']),
    ...mapGetters('students', ['studentsNumber']),
    areAllStudentsDisplayed() {
      return this.studentsNumber == this.totalStudents;
    },
  },
  created() {
    this.getStudents();
  },
  methods: {
    ...mapActions('students', ['getStudents']),
    loadMore() {
      this.page += 1;
      this.getStudents(this.page);
    },
  },
};
</script>
