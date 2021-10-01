<template>
  <v-card>
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="text-h6 primary--text">
        {{ $t('profile.jobs.title') }}
      </v-card-title>
      <AlumniJobFormAdd v-if="showDialogButton" />
    </div>
    <v-divider></v-divider>
    <div
      v-if="!alumni.jobs.length"
      class="text--disabled font-italic pa-4 text-center"
    >
      {{ $t('profile.jobs.noJob') }}
    </div>
    <v-card-text>
      <AlumniJobCard
        v-for="(job, index) in alumni.jobs"
        :class="{ 'mb-8': index !== alumni.jobs.length - 1 }"
        :key="job.id"
        :job="job"
        :showDialogButton="showDialogButton"
        @edit="editingJob = job"
        @delete="deletingJob = job"
      />
    </v-card-text>
    <AlumniJobFormEdit :job="editingJob" @close="editingJob = null" />
    <AlumniJobFormDelete :job="deletingJob" @close="deletingJob = null" />
  </v-card>
</template>

<script>
import AlumniJobCard from './AlumniJobCard.vue';
import AlumniJobFormAdd from './AlumniJobFormAdd.vue';
import AlumniJobFormEdit from './AlumniJobFormEdit.vue';
import AlumniJobFormDelete from './AlumniJobFormDelete.vue';

export default {
  name: 'AlumniJobs',
  components: {
    AlumniJobCard,
    AlumniJobFormAdd,
    AlumniJobFormEdit,
    AlumniJobFormDelete,
  },
  props: {
    alumni: {
      type: Object,
      required: true,
    },
    showDialogButton: {
      type: Boolean,
    },
  },
  data() {
    return {
      editingJob: null,
      deletingJob: null,
    };
  },
};
</script>
