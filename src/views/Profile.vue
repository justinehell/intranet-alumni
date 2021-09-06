<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          {{ $t('profile.title') }}
        </h1>
      </v-col>
      <v-col cols="12" v-if="user && userStudent">
        <InfoProfile :user="user" :userStudent="userStudent" />
      </v-col>
      <v-col cols="12" v-if="userStudent" class="text-center">
        <EditProfile :userStudent="userStudent" />
      </v-col>
      <v-col v-if="userStudent">
        <div class="d-flex justify-space-between pa-4">
          <h2>{{ $t('profile.jobs') }}</h2>
          <AddJob />
        </div>
        <JobCard
          v-for="job in userStudent.jobs"
          :key="job.id"
          :job="job"
          @edit="editingJob = job"
          @delete="deletingJob = job"
        />
        <EditJob :job="editingJob" @close="editingJob = null" />
        <DeleteJob :job="deletingJob" @close="deletingJob = null" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import InfoProfile from '../components/Profile/ProfileCard.vue';
import EditProfile from '../components/Profile/ProfileDialogEditForm.vue';
import JobCard from '../components/Profile/Jobs/JobCard.vue';
import AddJob from '../components/Profile/Jobs/JobDialogAddForm.vue';
import EditJob from '../components/Profile/Jobs/JobDialogEditForm.vue';
import DeleteJob from '../components/Profile/Jobs/JobDialogDeleteForm.vue';

export default {
  name: 'Profile',
  components: {
    InfoProfile,
    EditProfile,
    JobCard,
    AddJob,
    EditJob,
    DeleteJob,
  },
  data() {
    return {
      editingJob: null,
      deletingJob: null,
    };
  },
  async created() {
    this.userStudent ? null : await this.me();
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('students', ['userStudent']),
  },
  methods: {
    ...mapActions('students', ['me']),
  },
};
</script>
