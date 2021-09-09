<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="user && userStudent">
        <ProfileCard :user="user" :userStudent="userStudent" showEditDialog />
      </v-col>

      <v-col cols="12" v-if="userStudent">
        <Jobs :userStudent="userStudent" />
      </v-col>

      <v-col cols="12" v-if="user && userStudent" class="text-center">
        <v-btn @click="signOut" color="error" class="text-uppercase">
          {{ $t('action.signOut') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

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
  async created() {
    this.userStudent ? null : await this.me();
  },
  computed: {
    ...mapState('auth', ['user']),
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
