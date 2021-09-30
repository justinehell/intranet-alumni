<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbsItems" large />

    <v-row v-if="alumni">
      <v-col cols="12">
        <AlumniCardDetail :userAlumni="alumni" />
      </v-col>

      <v-col cols="12">
        <AlumniJobs :userAlumni="alumni" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AlumniCardDetail from '../components/AlumniCardDetail.vue';
import AlumniJobs from '../components/AlumniJobs.vue';

export default {
  name: 'AlumniDetail',
  components: {
    AlumniCardDetail,
    AlumniJobs,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    this.alumni ? null : this.getAlumni(this.id);
  },
  methods: {
    ...mapActions('alumnis', ['getAlumni']),
  },
  computed: {
    ...mapGetters('alumnis', ['getAlumniById']),
    alumni() {
      return this.getAlumniById(this.id);
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
};
</script>
