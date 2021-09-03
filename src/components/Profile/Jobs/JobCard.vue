<template>
  <v-card>
    <v-card-text class="d-flex justify-space-between">
      <div>
        <v-card-title class="text-h4">
          {{ job.function }}
        </v-card-title>

        <v-card-subtitle v-if="job.company">{{ job.company }}</v-card-subtitle>
        <v-card-subtitle v-if="job.contractType">{{
          job.contractType
        }}</v-card-subtitle>
        <v-card-subtitle v-if="job.contractType">{{
          formatDate(job.dateStart)
        }}</v-card-subtitle>
        <v-card-subtitle v-if="job.dateEnd">{{
          formatDate(job.dateEnd)
        }}</v-card-subtitle>
        <v-card-subtitle v-if="job.department">{{
          job.department
        }}</v-card-subtitle>
        <v-card-subtitle v-if="job.fixedPhoneNumber">{{
          job.fixedPhoneNumber
        }}</v-card-subtitle>
        <v-card-subtitle v-if="job.mobilePhoneNumber">{{
          job.mobilePhoneNumber
        }}</v-card-subtitle>
        <v-card-subtitle v-if="job.locationAdress">{{
          job.locationAdress
        }}</v-card-subtitle>
        <v-card-subtitle v-if="job.locationPostcode">{{
          job.locationPostcode
        }}</v-card-subtitle>
        <v-card-subtitle v-if="job.locationCity">{{
          job.locationCity
        }}</v-card-subtitle>
        <v-card-subtitle v-if="job.locationCountry">{{
          job.locationCountry
        }}</v-card-subtitle>
        <v-card-subtitle v-if="job.professionalEmail">{{
          job.professionalEmail
        }}</v-card-subtitle>
      </div>
      <div>
        <v-btn
          class="mx-2"
          fab
          small
          dark
          color="indigo"
          @click="$emit('edit')"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { formatDate } from '../../../utils/index';
export default {
  name: 'Jobs',
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
