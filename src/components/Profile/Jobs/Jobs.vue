<template>
  <v-card>
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="text-h6 primary--text">
        {{ $t('profile.jobs.title') }}
      </v-card-title>
      <JobCardAdd v-if="showDialogButton" />
    </div>
    <v-divider></v-divider>
    <div
      v-if="!userStudent.jobs.length"
      class="text--disabled font-italic pa-4 text-center"
    >
      {{ $t('profile.jobs.noJob') }}
    </div>
    <JobCard
      v-for="job in userStudent.jobs"
      :key="job.id"
      :job="job"
      :showDialogButton="showDialogButton"
      @edit="editingJob = job"
      @delete="deletingJob = job"
    />
    <JobCardEdit :job="editingJob" @close="editingJob = null" />
    <JobCardDelete :job="deletingJob" @close="deletingJob = null" />
  </v-card>
</template>

<script>
import JobCard from './JobCard.vue';
import JobCardAdd from './JobDialogAddForm.vue';
import JobCardEdit from './JobDialogEditForm.vue';
import JobCardDelete from './JobDialogDeleteForm.vue';

export default {
  name: 'Jobs',
  components: {
    JobCard,
    JobCardAdd,
    JobCardEdit,
    JobCardDelete,
  },
  props: {
    userStudent: {
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
