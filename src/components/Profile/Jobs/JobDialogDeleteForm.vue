<template>
  <v-dialog
    :value="job"
    scrollable
    max-width="600px"
    @click:outside="$emit('close')"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ $t('profile.modal.deleteJob') }}</span>
      </v-card-title>
      <v-card-text>
        <v-row v-if="job">
          <v-col cols="12">
            <div class="mb-4">
              <span>{{ $t('form.function.label') }} :</span>
              <span class="text--primary">
                {{ job.function }}
              </span>
            </div>
          </v-col>
        </v-row>
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
          {{ $t('action.delete') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'JobDialogDeleteForm',
  props: {
    job: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions('students', ['deleteJob']),
    submit() {
      this.loading = true;
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
    },
  },
};
</script>
