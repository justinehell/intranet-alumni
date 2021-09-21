<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="userStudent">
        <ProfileCard :userStudent="userStudent" showEditDialog />
      </v-col>

      <v-col cols="12" v-if="userStudent">
        <Jobs :userStudent="userStudent" showDialogButton />
      </v-col>

      <v-col cols="12" v-if="userStudent" class="text-center">
        <v-btn @click="signOut" color="error" class="text-uppercase">
          {{ $t('action.signOut') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ProfileCard from '../components/Profile/ProfileCard.vue';
import Jobs from '../components/Profile/Jobs/Jobs.vue';

export default {
  name: 'Profile',
  components: {
    ProfileCard,
    Jobs,
  },
  data() {
    return {
      editingJob: null,
      deletingJob: null,
    };
  },
  created() {
    this.userStudent ? null : this.me();
  },
  computed: {
    ...mapGetters('students', ['userStudent']),
  },
  methods: {
    ...mapActions('students', ['me']),
    signOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
