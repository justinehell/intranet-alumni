<template>
  <BaseDialog
    ref="dialog"
    :title="$t('profile.modal.editJob')"
    :submitText="$t('action.edit')"
    :loading="loading"
    :isSubmitButtonDisabled="isFormInvalid"
    @submit="submit"
    @dialog:open="dialogOpenHandler"
    @dialog:close="dialogCloseHandler"
  >
    <v-form>
      <v-row no-gutters>
        <v-col cols="12" class="px-2">
          <v-text-field
            v-model="functionTitle"
            :label="`${$t('form.function.label')} *`"
            :error-messages="functionErrors"
            @input="$v.functionTitle.$touch()"
            @blur="$v.functionTitle.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="px-2">
          <v-select
            v-model="contractType"
            :label="`${$t('form.contractType.label')} *`"
            :items="contracts"
            menu-props="auto"
            :error-messages="contractTypeErrors"
            @input="$v.contractType.$touch()"
            @blur="$v.contractType.$touch()"
          ></v-select>
        </v-col>
        <v-col cols="12" class="px-2">
          <v-switch
            v-model="isCurrentJob"
            :label="$t('form.isCurrentJob.label')"
          ></v-switch>
        </v-col>
        <v-col cols="6" class="px-2">
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
                :label="`${$t('form.dateStart.label')} *`"
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
              no-title
              min="1950-01-01"
              :max="yearsFromNowDate(5)"
              :disabled="!dateStart"
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6" class="px-2">
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
                :label="`${$t('form.dateEnd.label')}`"
                append-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                :error-messages="dateEndErrors"
                @input="$v.dateEnd.$touch()"
                @blur="$v.dateEnd.$touch()"
                :disabled="!dateStart || isCurrentJob"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateEnd"
              no-title
              :min="dateStart"
              :max="yearsFromNowDate(5)"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" class="px-2">
          <v-textarea
            v-model="description"
            :label="$t('form.description.label')"
          ></v-textarea>
        </v-col>
        <v-col cols="12" class="px-2">
          <v-text-field
            v-model="company"
            type="text"
            :label="`${$t('form.company.label')} *`"
            :error-messages="companyErrors"
            @input="$v.company.$touch()"
            @blur="$v.company.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="px-2">
          <v-text-field
            v-model="department"
            :label="$t('form.department.label')"
            :error-messages="departmentErrors"
            @input="$v.department.$touch()"
            @blur="$v.department.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="px-2">
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
        <v-col cols="6" class="px-2">
          <v-text-field
            v-model="locationPostcode"
            :label="$t('form.locationPostcode.label')"
            append-icon="mdi-map-marker"
            :error-messages="locationPostcodeErrors"
            @input="$v.locationPostcode.$touch()"
            @blur="$v.locationPostcode.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="px-2">
          <v-text-field
            v-model="locationCity"
            :label="$t('form.locationCity.label')"
            append-icon="mdi-map-marker"
            :error-messages="locationCityErrors"
            @input="$v.locationCity.$touch()"
            @blur="$v.locationCity.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="px-2">
          <v-select
            v-model="locationCountry"
            :label="$t('form.locationCountry.label')"
            :items="countries"
            menu-props="auto"
          ></v-select>
        </v-col>
        <v-col cols="12" class="px-2">
          <v-text-field
            v-model="fixedPhoneNumber"
            :label="$t('form.phoneNumber.label.fixed')"
            append-icon="mdi-phone"
            :error-messages="fixedPhoneNumberErrors"
            @input="$v.fixedPhoneNumber.$touch()"
            @blur="$v.fixedPhoneNumber.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="px-2">
          <v-text-field
            v-model="mobilePhoneNumber"
            :label="$t('form.phoneNumber.label.mobile')"
            append-icon="mdi-phone"
            :error-messages="mobilePhoneNumberErrors"
            @input="$v.mobilePhoneNumber.$touch()"
            @blur="$v.mobilePhoneNumber.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </BaseDialog>
</template>

<script>
import { mapActions } from 'vuex';
import {
  required,
  requiredIf,
  numeric,
  maxLength,
} from 'vuelidate/lib/validators';

import formFieldMixinVue from '../mixins/formFieldMixin.vue';
import { COUNTRIES } from '../utils/countriesCode';
import { CONTRACTS } from '../utils/contractsType';

import BaseDialog from './Base/BaseDialog.vue';

export default {
  name: 'AlumniJobFormEdit',
  components: {
    BaseDialog,
  },
  props: {
    job: {
      type: Object,
      required: false,
    },
  },
  mixins: [formFieldMixinVue],
  validations: {
    fixedPhoneNumber: { numeric, maxLength: maxLength(10) },
    mobilePhoneNumber: { numeric, maxLength: maxLength(10) },
    locationPostcode: { numeric, maxLength: maxLength(10) },
    locationAdress: { maxLength: maxLength(200) },
    locationCity: { maxLength: maxLength(200) },
    functionTitle: { required, maxLength: maxLength(200) },
    contractType: { required },
    dateStart: { required },
    dateEnd: {
      required: requiredIf(function() {
        return !this.isCurrentJob && !!this.dateStart;
      }),
    },
    company: { required, maxLength: maxLength(200) },
    department: { maxLength: maxLength(200) },
  },
  data() {
    return {
      functionTitle: '',
      company: '',
      contractType: '',
      dateStart: '',
      dateEnd: '',
      department: '',
      description: '',
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
    };
  },
  computed: {
    dateStartFormatted() {
      return this.dateStart
        ? this.$d(new Date(this.dateStart), 'numeric')
        : null;
    },
    dateEndFormatted() {
      return this.dateEnd ? this.$d(new Date(this.dateEnd), 'numeric') : null;
    },
    countries() {
      return COUNTRIES.map((countryCode) => {
        return { value: countryCode, text: this.$t(`COUNTRY.${countryCode}`) };
      }).sort((a, b) => a.text.localeCompare(b.text));
    },
    contracts() {
      return CONTRACTS.map((contract) => {
        return { value: contract, text: this.$t(`CONTRACT.${contract}`) };
      });
    },
  },
  watch: {
    job(val) {
      val && (this.setFormData(), this.$refs.dialog.openDialog());
    },
    isCurrentJob(val) {
      val && (this.dateEnd = null);
    },
    dateStart(val) {
      val && new Date(val) > new Date(this.dateEnd) && (this.dateEnd = null);
    },
  },
  methods: {
    ...mapActions('alumnis', ['editJob']),
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        let updatedAlumniJob = {
          function: this.functionTitle,
          company: this.company,
          contractType: this.contractType,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
          department: this.department,
          description: this.description,
          fixedPhoneNumber: this.fixedPhoneNumber,
          mobilePhoneNumber: this.mobilePhoneNumber,
          locationAdress: this.locationAdress,
          locationPostcode: this.locationPostcode,
          locationCity: this.locationCity,
          locationCountry: this.locationCountry,
          professionalEmail: this.professionalEmail,
          isCurrentJob: this.isCurrentJob,
          id: this.job.id,
        };
        this.editJob(updatedAlumniJob)
          .then(() => {
            this.$refs.dialog.closeDialog();
          })
          .catch((error) => {
            this.setServerError(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    dialogOpenHandler() {
      this.setFormData();
    },
    dialogCloseHandler() {
      this.$emit('close');
    },
    setFormData() {
      this.functionTitle = this.job.function;
      this.company = this.job.company;
      this.contractType = this.job.contractType;
      this.department = this.job.department;
      this.description = this.job.description;
      this.isCurrentJob = this.job.isCurrentJob;
      this.dateStart = this.job.dateStart;
      this.dateEnd = this.job.dateEnd;
    },
  },
};
</script>
