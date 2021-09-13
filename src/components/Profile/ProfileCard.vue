<template>
  <v-card>
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="text-h6">
        {{ userStudent.fullName }}
      </v-card-title>
      <ProfileCardEdit v-if="showEditDialog" :userStudent="userStudent" />
    </div>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <div class="mb-4">
            <v-icon class="mr-2">mdi-school</v-icon>
            <span class="text--primary">
              {{ $t(`PROMO.${userStudent.promo}`) }}
            </span>
          </div>
          <div class="mb-4" v-if="userStudent.email">
            <v-icon class="mr-2">mdi-email</v-icon>
            <span class="text--primary">
              {{ userStudent.email }}
            </span>
          </div>

          <div class="mb-4" v-if="userStudent.birthDate">
            <v-icon class="mr-2">mdi-calendar</v-icon>
            <span class="text--primary">
              {{ formatDate(userStudent.birthDate) }}
            </span>
          </div>

          <div
            class="mb-4"
            v-if="
              userStudent.locationAdress ||
                userStudent.locationPostcode ||
                userStudent.locationCity ||
                userStudent.locationCountry
            "
          >
            <v-icon class="mr-2">mdi-map-marker</v-icon>
            <span class="text--primary">
              {{ displayAdress(userStudent.locationAdress) }}
              {{ displayAdress(userStudent.locationPostcode) }}
              {{ displayAdress(userStudent.locationCity) }}
              {{ displayCountry(displayAdress(userStudent.locationCountry)) }}
            </span>
          </div>

          <div class="mb-4" v-if="userStudent.phoneNumber">
            <v-icon class="mr-2">mdi-phone</v-icon>
            <span class="text--primary">
              {{ userStudent.phoneNumber }}
            </span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { formatDate } from '../../utils/index';
import ProfileCardEdit from './ProfileDialogEditForm.vue';

export default {
  name: 'ProfileCard',
  components: {
    ProfileCardEdit,
  },
  props: {
    userStudent: {
      type: Object,
      required: true,
    },
    showEditDialog: {
      type: Boolean,
    },
  },

  data() {
    return {};
  },
  computed: {},
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
