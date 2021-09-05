<template>
  <v-dialog :value="job" max-width="600px" @click:outside="$emit('close')">
    <v-card>
      <v-card-title>
        <span class="text-h5">Delete Job</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :value="functionTitle"
                :label="$t('form.function.label')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :value="contractType"
                :label="$t('form.contractType.label')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :value="dateStartFormatted"
                :label="$t('form.dateStart.label')"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                :value="company"
                :label="$t('form.company.label')"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click.stop="$emit('close')">{{
          $t('action.cancel')
        }}</v-btn>
        <v-btn
          color="blue darken-1"
          @click="submit"
          depressed
          :loading="loading"
        >
          {{ $t('action.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import formFieldMixinVue from '../../../mixins/formFieldMixin.vue';
import { formatDate } from '../../../utils/index';

export default {
  name: 'DeleteJob',
  props: {
    job: {
      type: Object,
      required: false,
    },
  },
  mixins: [formFieldMixinVue],
  data() {
    return {
      functionTitle: '',
      company: '',
      contractType: '',
      dateStart: '',
      dateEnd: '',
      loading: false,
    };
  },
  computed: {
    dateStartFormatted() {
      return this.formatDate(this.dateStart);
    },
    dateEndFormatted() {
      return this.formatDate(this.dateEnd);
    },
  },
  watch: {
    job(val) {
      val && this.setFormData();
    },
  },
  methods: {
    ...mapActions('students', ['deleteJob']),
    formatDate,
    submit() {
      this.loading = true;
      if (this.job) {
        this.deleteJob(this.job.id)
          .then(() => {
            this.$emit('close');
          })
          .catch((error) => {
            this.setServerError(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    setFormData() {
      this.functionTitle = this.job?.function;
      this.company = this.job?.company;
      this.contractType = this.job?.contractType;
      this.dateStart = this.job?.dateStart;
    },
  },
};
</script>
