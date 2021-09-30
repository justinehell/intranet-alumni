<template>
  <BaseDialog
    ref="dialog"
    :submitText="$t('action.delete')"
    :title="$t('profile.modal.deleteJob')"
    :loading="loading"
    @dialog:close="dialogCloseHandler"
    @submit="submit"
  >
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
  </BaseDialog>
</template>

<script>
import { mapActions } from 'vuex';
import BaseDialog from './Base/BaseDialog.vue';

export default {
  name: 'AlumniJobFormDelete',
  components: {
    BaseDialog,
  },
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
  watch: {
    job(val) {
      val && this.$refs.dialog.openDialog();
    },
  },
  methods: {
    ...mapActions('alumnis', ['deleteJob']),
    submit() {
      this.loading = true;
      this.deleteJob(this.job.id)
        .then(() => {
          this.$refs.dialog.closeDialog();
        })
        .catch((error) => {
          this.setServerError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    dialogCloseHandler() {
      this.$emit('close');
    },
  },
};
</script>
