<template>
  <v-card>
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="text-h6">
        {{ `${user.firstName} ${user.lastName}` }}
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
              {{ $t(`PROMO.${user.promo}`) }}
            </span>
          </div>
          <div class="mb-4">
            <v-icon class="mr-2">mdi-email</v-icon>
            <span class="text--primary">
              {{ user.email }}
            </span>
          </div>

          <div class="mb-4" v-if="userStudent.birthDate">
            <v-icon class="mr-2">mdi-calendar</v-icon>
            <span class="text--primary">
              {{ formatDate(userStudent.birthDate) }}
            </span>
          </div>

          <div class="mb-4" v-if="userStudent.locationAdress">
            <span>{{ $t('form.locationAdress.label') }} :</span>
            <span class="text--primary">
              {{ userStudent.locationAdress }}
            </span>
          </div>

          <div class="mb-4" v-if="userStudent.locationPostcode">
            <span>{{ $t('form.locationPostcode.label') }} :</span>
            <span class="text--primary">
              {{ userStudent.locationPostcode }}
            </span>
          </div>

          <div class="mb-4" v-if="userStudent.locationCity">
            <span>{{ $t('form.locationCity.label') }} :</span>
            <span class="text--primary">
              {{ userStudent.locationCity }}
            </span>
          </div>

          <div class="mb-4" v-if="userStudent.locationCountry">
            <span>{{ $t('form.locationCountry.label') }} :</span>
            <span class="text--primary">
              {{ $t(`COUNTRY.${userStudent.locationCountry}`) }}
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
    user: {
      type: Object,
      required: true,
    },
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
  },
};
</script>
