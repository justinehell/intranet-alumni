<template>
  <div class="d-flex justify-space-between">
    <div class="ma-4">
      <span class="font-weight-medium"> {{ job.function }} </span><br />

      <span v-if="job.company" class="font-weight-medium">
        <v-icon color="indigo" small>
          mdi-domain
        </v-icon>
        {{ job.company }}</span
      >&nbsp;

      <span v-if="job.isCurrentJob" class="text--disabled">
        {{
          $t('profile.jobs.currentJob', { start: formatDate(job.dateStart) })
        }}</span
      >&nbsp;
      <span v-if="!job.isCurrentJob" class="text--disabled">{{
        $t('profile.jobs.finishedJob', {
          start: formatDate(job.dateEnd),
          end: formatDate(job.dateStart),
        })
      }}</span
      ><br />
      <span v-if="job.contractType">{{
        $t(`CONTRACT.${job.contractType}`)
      }}</span
      >&nbsp; <span v-if="job.department">{{ job.department }}</span
      >&nbsp; <span v-if="job.fixedPhoneNumber">{{ job.fixedPhoneNumber }}</span
      >&nbsp;
      <span v-if="job.mobilePhoneNumber">{{ job.mobilePhoneNumber }}</span
      >&nbsp; <span v-if="job.locationAdress">{{ job.locationAdress }}</span
      >&nbsp; <span v-if="job.locationPostcode">{{ job.locationPostcode }}</span
      >&nbsp; <span v-if="job.locationCity">{{ job.locationCity }}</span
      >&nbsp;
      <span v-if="job.locationCountry">{{
        $t(`COUNTRY.${job.locationCountry}`)
      }}</span
      >&nbsp;
      <span v-if="job.professionalEmail">{{ job.professionalEmail }}</span
      >&nbsp;
    </div>
    <div>
      <v-btn icon small color="indigo" @click="$emit('edit')">
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn icon color="error" @click="$emit('delete')">
        <v-icon small>
          mdi-delete
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../../utils/index';
export default {
  name: 'JobCard',
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
};
</script>
