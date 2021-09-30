<template>
  <v-card>
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="text-h6 primary--text">
        {{ userAlumni.fullName }}
      </v-card-title>
      <AlumniFormEdit v-if="showEditDialog" :userAlumni="userAlumni" />
    </div>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <div class="mb-4">
            <v-icon class="mr-2" color="primary">mdi-school</v-icon>
            <span class="text--primary">
              {{ $t(`PROMO.${userAlumni.promo}`) }}
            </span>
          </div>
          <div class="mb-4" v-if="userAlumni.email">
            <v-icon class="mr-2" color="primary">mdi-email</v-icon>
            <span class="text--primary">
              {{ userAlumni.email }}
            </span>
          </div>

          <div class="mb-4" v-if="userAlumni.birthDate">
            <v-icon class="mr-2" color="primary">mdi-calendar</v-icon>
            <span class="text--primary">
              {{ formatDate(userAlumni.birthDate) }}
            </span>
          </div>

          <div
            class="mb-4"
            v-if="
              userAlumni.locationAdress ||
                userAlumni.locationPostcode ||
                userAlumni.locationCity ||
                userAlumni.locationCountry
            "
          >
            <v-icon class="mr-2" color="primary">mdi-map-marker</v-icon>
            <span class="text--primary">
              {{ displayAdress(userAlumni.locationAdress) }}
              {{ displayAdress(userAlumni.locationPostcode) }}
              {{ displayAdress(userAlumni.locationCity) }}
              {{ displayCountry(displayAdress(userAlumni.locationCountry)) }}
            </span>
          </div>

          <div class="mb-4" v-if="userAlumni.phoneNumber">
            <v-icon class="mr-2" color="primary">mdi-phone</v-icon>
            <span class="text--primary">
              {{ userAlumni.phoneNumber }}
            </span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { formatDate } from '../utils/index';
import AlumniFormEdit from './AlumniFormEdit.vue';

export default {
  name: 'AlumniCardDetail',
  components: {
    AlumniFormEdit,
  },
  props: {
    userAlumni: {
      type: Object,
      required: true,
    },
    showEditDialog: {
      type: Boolean,
    },
  },
  methods: {
    formatDate,
    displayAdress(string) {
      return string ? string : '';
    },
    displayCountry(country) {
      return country ? `(${this.$t(`COUNTRY.${country}`)})` : '';
    },
  },
};
</script>
