<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            {{ $t('home.title') }}
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :placeholder="$t('alumniList.student')"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="studentsList"
            :search="search"
          >
            <template v-slot:item.promo="{ item }">
              {{ $t(`PROMO.${item.promo}`) }}
            </template>

            <template v-slot:item.isCaMember="{ item }">
              <v-icon v-if="item.isCaMember">mdi-account-tie</v-icon>
            </template>

            <template v-slot:item.isContributor="{ item }">
              <v-icon v-if="item.isContributor">mdi-medal</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Nom',
          align: 'start',
          value: 'lastName',
        },
        { text: 'Prénom', value: 'firstName' },
        { text: 'Promo', value: 'promo' },
        { text: 'Membre du CA', align: 'center', value: 'isCaMember' },
        { text: 'Contributeur.rice', align: 'center', value: 'isContributor' },
      ],
    };
  },
  computed: {
    ...mapGetters('students', ['studentsList']),
  },
};
</script>
