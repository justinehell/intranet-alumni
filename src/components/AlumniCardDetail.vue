<template>
  <v-card>
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="text-h6 primary--text">
        {{ alumni.fullName }}
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="alumni.isCaMember"
              right
              color="primary"
              v-bind="attrs"
              v-on="on"
              >mdi-account-tie</v-icon
            >
          </template>
          <span>{{ $t('alumni.isCaMember') }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="alumni.isContributor"
              right
              color="primary"
              v-bind="attrs"
              v-on="on"
              >mdi-seal-variant</v-icon
            >
          </template>
          <span>{{ $t('alumni.isContributor') }}</span>
        </v-tooltip>
      </v-card-title>
      <AlumniFormEdit v-if="showEditDialog" :alumni="alumni" />
    </div>
    <v-divider></v-divider>
    <v-img contain height="200px" src="@/assets/images/alumni/alumni-2.png">
    </v-img>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <div class="mb-4" v-if="alumni.birthDate">
            <v-icon class="mr-2" color="secondary">mdi-calendar</v-icon>
            <span>{{ $t('alumni.years', { years: alumniAge }) }} </span>
          </div>

          <div class="mb-4">
            <v-icon class="mr-2" color="secondary">mdi-school</v-icon>
            <span class="secondary--text">{{ $t('alumni.promo') }} :</span>
            <span>
              {{ $t(`PROMO.${alumni.promo}`) }}
            </span>
          </div>

          <div class="mb-4" v-if="isAlumniAdressValid">
            <v-icon class="mr-2" color="secondary">mdi-map-marker</v-icon>
            <span v-if="alumni.locationCity">
              {{ alumni.locationCity }}
            </span>
            <span v-if="alumni.locationCountry">
              {{ $t(`COUNTRY.${alumni.locationCountry}`) }}
            </span>
          </div>

          <v-row>
            <v-col class="mb-4" v-if="alumni.email">
              <v-icon class="mr-2" color="secondary">mdi-email</v-icon>
              <a
                :href="`mailto:${alumni.email}`"
                class="text--secondary text-decoration-none"
              >
                {{ alumni.email }}
              </a>
            </v-col>
            <v-col class="mb-4" v-if="alumni.phoneNumber">
              <v-icon class="mr-2" color="secondary">mdi-phone</v-icon>
              <a
                :href="`tel:+33${alumni.phoneNumber}`"
                class="text--secondary text-decoration-none"
              >
                {{ alumni.phoneNumber.replace(/(.{2})/g, '$1 ') }}
              </a>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import AlumniFormEdit from './AlumniFormEdit.vue';

export default {
  name: 'AlumniCardDetail',
  components: {
    AlumniFormEdit,
  },
  props: {
    alumni: {
      type: Object,
      required: true,
    },
    showEditDialog: {
      type: Boolean,
    },
  },
  computed: {
    isAlumniAdressValid() {
      return Boolean(this.alumni.locationCity || this.alumni.locationCity);
    },
    alumniAge() {
      if (!this.alumni.birthDate) return null;
      let timeDifferenceInMs =
        Date.now() - new Date(this.alumni.birthDate).getTime();
      let ageDeltaTime = new Date(timeDifferenceInMs);
      // Date objects contain a Number that represents milliseconds since 1 January 1970 UTC.
      return Math.abs(ageDeltaTime.getUTCFullYear() - 1970);
    },
  },
};
</script>
