<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1>
          {{ $t('alumniList.title') }}
        </h1>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          type="text"
          clearable
          :placeholder="$t('alumniList.student')"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-select
          v-model="promo"
          :items="promoListItems"
          clearable
          :label="$t('form.promo.label')"
          prepend-inner-icon="mdi-school"
        ></v-select>
      </v-col>
    </v-row>

    <v-row v-if="students" class="mb-4">
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="student in filteredStudents"
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
        v-if="!areAllStudentsDisplayed"
        dark
        color="tertiary"
        >{{ $t('action.loadMore') }}</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { PROMOLIST } from '../utils/promoList';

export default {
  name: 'AlumniList',
  data() {
    return {
      page: 1,
      search: '',
      promo: '',
    };
  },
  computed: {
    ...mapState('students', ['students', 'totalStudents']),
    ...mapGetters('students', ['studentsNumber', 'studentsList']),
    promoListItems() {
      return PROMOLIST.map((promo) => {
        return { value: promo, text: this.$t(`PROMO.${promo}`) };
      });
    },
    areAllStudentsDisplayed() {
      return this.studentsNumber == this.totalStudents;
    },
    filteredStudents() {
      return this.studentsList
        .filter((item) => {
          return (
            !this.search ||
            item.fullName.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          );
        })
        .filter((item) => {
          return !this.promo || item.promo === this.promo;
          // return !this.promo || !item.promo.indexOf(this.promo))
        });
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
