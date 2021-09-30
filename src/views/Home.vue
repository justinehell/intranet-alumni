<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center mb-16">
        <h1 class="text-h4 font-weight-medium mb-6">{{ $t('home.title') }}</h1>
        <p class="text-justify">{{ $t('home.description') }}</p>
      </v-col>

      <v-col cols="12" class="text-center mb-16">
        <h2 class="text-h5 font-weight-medium mb-6">
          {{ $t('home.CaMember.title') }}
        </h2>
        <p class="text-justify">{{ $t('home.CaMember.description') }}</p>

        <v-row v-if="contributorStudents" class="mt-8 justify-center">
          <v-col
            cols="12"
            md="6"
            lg="4"
            v-for="student in contributorStudents"
            :key="student.id"
          >
            <AlumniCard :alumni="student" />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="text-center mb-16">
        <h2 class="text-h5 font-weight-medium mb-6">
          {{ $t('home.contributor.title') }}
        </h2>
        <p class="text-justify">{{ $t('home.contributor.description') }}</p>

        <v-row v-if="caMemberStudents" class="mt-8 justify-center">
          <v-col
            cols="12"
            md="6"
            lg="4"
            v-for="student in caMemberStudents"
            :key="student.id"
          >
            <AlumniCard :alumni="student" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AlumniCard from '../components/AlumniCard.vue';
export default {
  name: 'Home',
  components: {
    AlumniCard,
  },
  created() {
    !this.caMemberStudents && this.getCaMemberStudents();
    !this.contributorStudents && this.getContributorStudents();
  },
  computed: {
    ...mapState('students', ['caMemberStudents', 'contributorStudents']),
  },
  methods: {
    ...mapActions('students', [
      'getCaMemberStudents',
      'getContributorStudents',
    ]),
  },
};
</script>
