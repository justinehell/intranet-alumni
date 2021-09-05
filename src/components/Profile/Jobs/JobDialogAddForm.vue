<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2"
        fab
        small
        dark
        color="indigo"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Job</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="functionTitle"
                :label="$t('form.function.label')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="contractType"
                :label="$t('form.contractType.label')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="dateStartFormatted"
                    :label="$t('form.dateStart.label')"
                    append-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    :error-messages="dateStartErrors"
                    @input="$v.dateStart.$touch()"
                    @blur="$v.dateStart.$touch()"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateStart"
                  active-picker="YEAR"
                  min="1950-01-01"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="dateEndFormatted"
                    :label="$t('form.dateEnd.label')"
                    append-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateEnd"
                  active-picker="YEAR"
                  min="1950-01-01"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="company"
                type="text"
                :label="$t('form.company.label')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="department"
                :label="$t('form.department.label')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="locationAdress"
                type="text"
                :label="$t('form.locationAdress.label')"
                append-icon="mdi-map-marker"
                :error-messages="locationAdressErrors"
                @input="$v.locationAdress.$touch()"
                @blur="$v.locationAdress.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="locationPostcode"
                :label="$t('form.locationPostcode.label')"
                append-icon="mdi-map-marker"
                :error-messages="locationPostcodeErrors"
                @input="$v.locationPostcode.$touch()"
                @blur="$v.locationPostcode.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="locationCity"
                :label="$t('form.locationCity.label')"
                append-icon="mdi-map-marker"
                :error-messages="locationCityErrors"
                @input="$v.locationCity.$touch()"
                @blur="$v.locationCity.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="locationCountry"
                :label="$t('form.locationCountry.label')"
                :items="countries"
                menu-props="auto"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="fixedPhoneNumber"
                :label="$t('form.phoneNumber.label')"
                append-icon="mdi-phone"
                :error-messages="fixedPhoneNumberErrors"
                @input="$v.fixedPhoneNumber.$touch()"
                @blur="$v.fixedPhoneNumber.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="mobilePhoneNumber"
                :label="$t('form.phoneNumber.label')"
                append-icon="mdi-phone"
                :error-messages="mobilePhoneNumberErrors"
                @input="$v.mobilePhoneNumber.$touch()"
                @blur="$v.mobilePhoneNumber.$touch()"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-switch
                v-model="isCurrentJob"
                label="J’occupe actuellement ce poste"
              ></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">{{
          $t('action.cancel')
        }}</v-btn>
        <v-btn
          color="blue darken-1"
          @click="submit"
          depressed
          :loading="loading"
        >
          {{ $t('action.add') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { numeric, maxLength, required } from 'vuelidate/lib/validators';

import formFieldMixinVue from '../../../mixins/formFieldMixin.vue';
import { formatDate } from '../../../utils/index';
import { COUNTRIES } from '../../../utils/countriesCode';

export default {
  name: 'AddJob',
  mixins: [formFieldMixinVue],
  validations: {
    fixedPhoneNumber: { numeric, maxLength: maxLength(10) },
    mobilePhoneNumber: { numeric, maxLength: maxLength(10) },
    locationPostcode: { numeric, maxLength: maxLength(10) },
    locationAdress: { maxLength: maxLength(200) },
    locationCity: { maxLength: maxLength(200) },
    dateStart: { required },
  },
  data() {
    return {
      functionTitle: '',
      company: '',
      contractType: '',
      dateStart: '',
      dateEnd: null,
      department: '',
      fixedPhoneNumber: '',
      mobilePhoneNumber: '',
      locationAdress: '',
      locationPostcode: '',
      locationCity: '',
      locationCountry: '',
      professionalEmail: '',
      isCurrentJob: '',
      menu1: false,
      menu2: false,
      loading: false,
      dialog: false,
    };
  },
  computed: {
    dateStartFormatted() {
      return this.formatDate(this.dateStart);
    },
    dateEndFormatted() {
      return this.formatDate(this.dateEnd);
    },
    countries() {
      return COUNTRIES.map((countryCode) => {
        return { value: countryCode, text: this.$t(`COUNTRY.${countryCode}`) };
      }).sort((a, b) => a.text.localeCompare(b.text));
    },
  },
  methods: {
    ...mapActions('students', ['addJob']),
    formatDate,
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        let newJob = {
          function: this.functionTitle,
          company: this.company,
          contractType: this.contractType,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
          department: this.department,
          fixedPhoneNumber: this.fixedPhoneNumber,
          mobilePhoneNumber: this.mobilePhoneNumber,
          locationAdress: this.locationAdress,
          locationPostcode: this.locationPostcode,
          locationCity: this.locationCity,
          locationCountry: this.locationCountry,
          professionalEmail: this.professionalEmail,
          isCurrentJob: this.isCurrentJob,
        };
        this.addJob(newJob)
          .then(() => {
            this.dialog = false;
          })
          .catch((error) => {
            this.setServerError(error);
          })
          .finally(() => {
            this.resetData();
            this.loading = false;
          });
      }
    },
    resetData() {
      this.$v.$reset();
      this.functionTitle = '';
      this.company = '';
      this.contractType = '';
      this.dateStart = '';
      this.dateEnd = null;
      this.department = '';
      this.fixedPhoneNumber = '';
      this.mobilePhoneNumber = '';
      this.locationAdress = '';
      this.locationPostcode = '';
      this.locationCity = '';
      this.locationCountry = '';
      this.professionalEmail = '';
      this.isCurrentJob = '';
    },
  },
};
</script>
