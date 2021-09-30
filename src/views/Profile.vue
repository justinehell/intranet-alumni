<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="userAlumni">
        <AlumniCardDetail :userAlumni="userAlumni" showEditDialog />
      </v-col>

      <v-col cols="12" v-if="userAlumni">
        <AlumniJobs :userAlumni="userAlumni" showDialogButton />
      </v-col>

      <v-col cols="12" v-if="userAlumni" class="text-center">
        <v-btn @click="signOut" color="error" class="text-uppercase">
          {{ $t('action.signOut') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AlumniCardDetail from '../components/AlumniCardDetail.vue';
import AlumniJobs from '../components/AlumniJobs.vue';

export default {
  name: 'Profile',
  components: {
    AlumniCardDetail,
    AlumniJobs,
  },
  data() {
    return {
      editingJob: null,
      deletingJob: null,
    };
  },
  created() {
    this.userAlumni ? null : this.me();
  },
  computed: {
    ...mapGetters('alumnis', ['userAlumni']),
  },
  methods: {
    ...mapActions('alumnis', ['me']),
    signOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
