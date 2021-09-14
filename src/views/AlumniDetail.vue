<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbsItems" large />

    <v-row v-if="alumni">
      <v-col cols="12">
        <ProfileCard :userStudent="alumni" />
      </v-col>

      <v-col cols="12">
        <Jobs :userStudent="alumni" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ProfileCard from '../components/Profile/ProfileCard.vue';
import Jobs from '../components/Profile/Jobs/Jobs.vue';

export default {
  name: 'AlumniDetail',
  components: {
    ProfileCard,
    Jobs,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('students', ['getStudentById']),
    alumni() {
      return this.getStudentById(this.id);
    },
    breadcrumbsItems() {
      return [
        {
          text: this.$t('alumniList.title'),
          to: { name: 'Alumni' },
          disabled: false,
          exact: true,
        },
        {
          text: `${this.alumni?.fullName || ''}`,
          disabled: true,
          exact: true,
        },
      ];
    },
  },

  created() {
    this.alumni ? null : this.getStudent(this.id);
  },
  methods: {
    ...mapActions('students', ['getStudent']),
  },
};
</script>
