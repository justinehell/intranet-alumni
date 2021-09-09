<template>
  <v-card>
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="text-h6">
        {{ $t('profile.jobs.title') }}
      </v-card-title>
      <JobCardAdd />
    </div>
    <v-divider></v-divider>
    <JobCard
      v-for="job in userStudent.jobs"
      :key="job.id"
      :job="job"
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
  },
  data() {
    return {
      editingJob: null,
      deletingJob: null,
    };
  },
};
</script>
