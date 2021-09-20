<template>
  <v-container>
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

    <v-row v-if="studentsList" class="mb-4">
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="student in filteredStudents"
        :key="student.id"
      >
        <v-card
          class="pa-2"
          :to="{
            name: 'AlumniDetail',
            params: { id: student.id },
          }"
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
import { mapGetters } from 'vuex';
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
    ...mapGetters('students', ['studentsList']),
    promoListItems() {
      return PROMOLIST.map((promo) => {
        return { value: promo, text: this.$t(`PROMO.${promo}`) };
      });
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
};
</script>
