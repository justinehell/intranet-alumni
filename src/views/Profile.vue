<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          {{ $t('profile.title') }}
        </h1>
      </v-col>
      <v-col cols="12">
        <v-card v-if="user && userStudent" :loading="loading">
          <v-card-title class="text-h4">
            {{ `${user.firstName} ${user.lastName}` }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <div class="mb-4">
                  <span>{{ $t('alumniList.promo') }} :</span>
                  <span class="text--primary">
                    {{ $t(`PROMO.${user.promo}`) }}
                  </span>
                </div>
                <div class="mb-4">
                  <span>{{ $t('form.email.label') }} :</span>
                  <span class="text--primary">
                    {{ user.email }}
                  </span>
                </div>

                <div class="mb-4" v-if="userStudent.birthDate">
                  <span>{{ $t('form.birthDate.label') }} :</span>
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
                  <span>{{ $t('form.phoneNumber.label') }} :</span>
                  <span class="text--primary">
                    {{ userStudent.phoneNumber }}
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="text-center">
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click="setFormData"
            >
              {{ $t('action.edit') }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ $t('profile.edit') }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
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
                        active-picker="YEAR"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
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
                      v-model="phoneNumber"
                      :label="$t('form.phoneNumber.label')"
                      append-icon="mdi-phone"
                      :error-messages="phoneNumberErrors"
                      @input="$v.phoneNumber.$touch()"
                      @blur="$v.phoneNumber.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                {{ $t('action.cancel') }}
              </v-btn>
              <v-btn
                color="blue darken-1"
                @click="submit"
                depressed
                :disabled="$v.$invalid"
              >
                {{ $t('action.save') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

import formFieldMixin from '../mixins/formFieldMixin.vue';
import { numeric, maxLength } from 'vuelidate/lib/validators';
import { COUNTRIES } from '../utils/countriesCode';

export default {
  name: 'Profile',
  mixins: [formFieldMixin],
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
      loading: false,
      dialog: false,
      menu: false,
    };
  },
  async created() {
    this.userStudent ? null : await this.me();
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('students', ['userStudent']),
    countries() {
      return COUNTRIES.map((countryCode) => {
        return { value: countryCode, text: this.$t(`COUNTRY.${countryCode}`) };
      }).sort((a, b) => a.text.localeCompare(b.text));
    },
    dateFormatted() {
      return this.formatDate(this.birthDate);
    },
  },
  methods: {
    ...mapActions('students', ['me', 'edit']),
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
          .catch((error) => {
            this.setServerError(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
      this.dialog = false;
    },
    setFormData() {
      this.birthDate = this.userStudent.birthDate;
      this.locationAdress = this.userStudent.locationAdress;
      this.locationPostcode = this.userStudent.locationPostcode;
      this.locationCity = this.userStudent.locationCity;
      this.locationCountry = this.userStudent.locationCountry;
      this.phoneNumber = this.userStudent.phoneNumber;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
