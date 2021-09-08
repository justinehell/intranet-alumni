<template>
  <BaseDialog
    ref="dialog"
    :title="$t('profile.modal.edit')"
    :submitText="$t('action.save')"
    :openDialogButtonText="$t('action.edit')"
    :loading="loading"
    :isSubmitButtonDisabled="isFormInvalid"
    @submit="submit"
    @dialog:open="dialogOpenHandler"
  >
    <v-form>
      <v-row no-gutters>
        <v-col cols="12" class="px-2">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="dateFormatted"
                :label="$t('form.birthDate.label')"
                append-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="birthDate"
              :active-picker="activePicker"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @input="menu = false"
              @change="save"
            ></v-date-picker>
          </v-menu>
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
            v-model="phoneNumber"
            :label="$t('form.phoneNumber.label.phone')"
            append-icon="mdi-phone"
            :error-messages="phoneNumberErrors"
            @input="$v.phoneNumber.$touch()"
            @blur="$v.phoneNumber.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </BaseDialog>
</template>

<script>
import { numeric, maxLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

import formFieldMixinVue from '../../mixins/formFieldMixin.vue';
import { COUNTRIES } from '../../utils/countriesCode';
import { formatDate } from '../../utils/index';

import BaseDialog from '../Base/BaseDialog.vue';

export default {
  name: 'ProfileDialogEditForm',
  components: {
    BaseDialog,
  },
  props: {
    userStudent: {
      type: Object,
      required: true,
    },
  },
  mixins: [formFieldMixinVue],
  validations: {
    phoneNumber: { numeric, maxLength: maxLength(10) },
    locationPostcode: { numeric, maxLength: maxLength(10) },
    locationAdress: { maxLength: maxLength(200) },
    locationCity: { maxLength: maxLength(200) },
  },
  data() {
    return {
      birthDate: '',
      locationAdress: '',
      locationPostcode: '',
      locationCity: '',
      locationCountry: '',
      phoneNumber: '',
      activePicker: null,
      loading: false,
      dialog: false,
      menu: false,
    };
  },
  computed: {
    countries() {
      return COUNTRIES.map((countryCode) => {
        return { value: countryCode, text: this.$t(`COUNTRY.${countryCode}`) };
      }).sort((a, b) => a.text.localeCompare(b.text));
    },
    dateFormatted() {
      return this.formatDate(this.birthDate);
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'));
    },
  },
  methods: {
    ...mapActions('students', ['edit']),
    formatDate,
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        let updatedStudent = {
          birthDate: this.birthDate,
          locationAdress: this.locationAdress,
          locationPostcode: this.locationPostcode,
          locationCity: this.locationCity,
          locationCountry: this.locationCountry,
          phoneNumber: this.phoneNumber,
          id: this.userStudent.id,
        };
        this.edit(updatedStudent)
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
    save(birthDate) {
      this.$refs.menu.save(birthDate);
    },
    dialogOpenHandler() {
      this.setFormData();
    },
    dialogCloseHandler() {
      this.$emit('close');
    },
    setFormData() {
      this.birthDate = this.userStudent.birthDate;
      this.locationAdress = this.userStudent.locationAdress;
      this.locationPostcode = this.userStudent.locationPostcode;
      this.locationCity = this.userStudent.locationCity;
      this.locationCountry = this.userStudent.locationCountry;
      this.phoneNumber = this.userStudent.phoneNumber;
    },
  },
};
</script>
