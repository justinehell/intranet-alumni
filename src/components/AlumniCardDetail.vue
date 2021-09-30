<template>
  <v-card>
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="text-h6 primary--text">
        {{ userAlumni.fullName }}
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="userAlumni.isCaMember"
              right
              color="primary"
              v-bind="attrs"
              v-on="on"
              >mdi-account-tie</v-icon
            >
          </template>
          <span>{{ $t('isCaMember') }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="userAlumni.isContributor"
              right
              color="primary"
              v-bind="attrs"
              v-on="on"
              >mdi-seal-variant</v-icon
            >
          </template>
          <span>{{ $t('isContributor') }}</span>
        </v-tooltip>
      </v-card-title>
      <AlumniFormEdit v-if="showEditDialog" :userAlumni="userAlumni" />
    </div>
    <v-divider></v-divider>
    <v-img contain height="200px" src="@/assets/images/alumni/alumni-2.png">
    </v-img>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <div class="mb-4">
            <v-icon class="mr-2" color="secondary">mdi-school</v-icon>
            <span class="text--primary">
              {{ $t(`PROMO.${userAlumni.promo}`) }}
            </span>
          </div>
          <div class="mb-4" v-if="userAlumni.email">
            <v-icon class="mr-2" color="secondary">mdi-email</v-icon>
            <span class="text--primary">
              {{ userAlumni.email }}
            </span>
          </div>

          <div class="mb-4" v-if="userAlumni.birthDate">
            <v-icon class="mr-2" color="secondary">mdi-calendar</v-icon>
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
            <v-icon class="mr-2" color="secondary">mdi-map-marker</v-icon>
            <span class="text--primary">
              {{ displayAdress(userAlumni.locationAdress) }}
              {{ displayAdress(userAlumni.locationPostcode) }}
              {{ displayAdress(userAlumni.locationCity) }}
              {{ displayCountry(displayAdress(userAlumni.locationCountry)) }}
            </span>
          </div>

          <div class="mb-4" v-if="userAlumni.phoneNumber">
            <v-icon class="mr-2" color="secondary">mdi-phone</v-icon>
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
