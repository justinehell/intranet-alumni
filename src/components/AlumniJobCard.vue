<template>
  <div class="d-flex justify-space-between align-baseline">
    <div>
      <span class="font-weight-medium secondary--text">
        {{ job.function }} </span
      >&nbsp;
      <span v-if="job.contractType" class="text--secondary">
        {{ $t(`CONTRACT.${job.contractType}`) }}</span
      >
      <br />

      <span v-if="job.isCurrentJob" class="text--disabled">
        {{
          $t('profile.jobs.currentJob', {
            start: $d(new Date(job.dateStart), 'numeric'),
          })
        }}</span
      >
      <span v-else class="text--disabled">{{
        $t('profile.jobs.finishedJob', {
          start: $d(new Date(job.dateStart), 'numeric'),
          end: $d(new Date(job.dateEnd), 'numeric'),
        })
      }}</span
      ><br />

      <span v-if="job.company" class="text--secondary">
        <v-icon color="secondary" small>
          mdi-domain
        </v-icon>
        {{ job.company }}</span
      >

      &nbsp; <span v-if="job.department">{{ job.department }}</span
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
    <div v-if="showDialogButton">
      <v-btn icon small color="secondary" @click="$emit('edit')">
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
export default {
  name: 'AlumniJobCard',
  props: {
    job: {
      type: Object,
      required: true,
    },
    showDialogButton: {
      type: Boolean,
    },
  },
};
</script>
