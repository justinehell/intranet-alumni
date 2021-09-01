<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbsItems" large />
    <v-card class="mt-4">
      <v-card-title class="text-h4">
        {{ `${alumni.firstName} ${alumni.lastName}` }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <div class="mb-4">
              <span>{{ $t('alumniList.promo') }} :</span>
              <span class="text--primary">
                {{ $t(`PROMO.${alumni.promo}`) }}
              </span>
            </div>
            {{ alumni }}
          </v-col>
          <v-col cols="12" v-if="alumni.jobs.length">
            <div v-for="job in alumni.jobs" :key="job.id">
              {{ job }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import alumniApiClient from '../services/alumniApi';
import { mapState } from 'vuex';

export default {
  name: 'AlumniDetail',
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
          text: `${this.alumni?.firstName} ${this.alumni?.lastName}`,
          to: { name: 'AlumniDetail', params: { id: this.alumni?.id } },
          disabled: true,
          exact: true,
        },
      ];
    },
  },
  data() {
    return {
      alumni: null,
    };
  },

  created() {
    const id = this.$route.params.id;
    this.students
      ? (this.alumni = this.students[id])
      : alumniApiClient.get(`students/${id}`).then((r) => {
          this.alumni = r.data;
        });
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
