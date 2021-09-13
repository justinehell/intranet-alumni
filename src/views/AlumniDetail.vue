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
import { mapState } from 'vuex';
import { getOneStudent } from '../services/students';

import ProfileCard from '../components/Profile/ProfileCard.vue';
import Jobs from '../components/Profile/Jobs/Jobs.vue';

export default {
  name: 'AlumniDetail',
  components: {
    ProfileCard,
    Jobs,
  },
  data() {
    return {
      alumni: null,
    };
  },
  computed: {
    ...mapState('students', ['students']),
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
          to: { name: 'AlumniDetail', params: { id: this.alumni?.id } },
          disabled: true,
          exact: true,
        },
      ];
    },
  },

  created() {
    Object.keys(this.students).length !== 0
      ? this.setAlumni()
      : this.getAlumni();
  },
  methods: {
    setAlumni() {
      this.alumni = this.students[this.$route.params.id];
    },
    async getAlumni() {
      await getOneStudent(this.$route.params.id)
        .then((r) => {
          this.alumni = r.data;
        })
        .catch((error) => {
          this.setServerError(error);
        });
    },
  },
};
</script>
