<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-text-field
          :value="fullName"
          type="text"
          clearable
          outlined
          :placeholder="$t('alumniList.search')"
          prepend-inner-icon="mdi-account"
          @input="
            $router.push({
              query: {
                ...$route.query,
                page: 1,
                fullName: $event,
              },
            })
          "
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          :value="promo"
          :items="promoListItems"
          clearable
          outlined
          :label="$t('form.promo.label')"
          prepend-inner-icon="mdi-school"
          @input="
            $router.push({
              query: {
                ...$route.query,
                page: 1,
                promo: $event,
              },
            })
          "
        ></v-select>
      </v-col>

      <v-col>
        <v-select
          :value="ordering"
          :items="items"
          clearable
          label="Trier par"
          outlined
          @input="
            $router.push({
              query: {
                ...$route.query,
                page: 1,
                ordering: $event,
              },
            })
          "
        ></v-select>
      </v-col>

      <v-col>
        <v-checkbox
          :input-value="isCaMember"
          label="Membre du CA"
          @change="
            $router.push({
              query: {
                ...$route.query,
                page: 1,
                isCaMember: $event || null,
              },
            })
          "
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <v-row v-if="alumniList" class="mb-4">
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="alumni in alumniList"
        :key="alumni.id"
      >
        <AlumniCard :alumni="alumni" />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center">
        <v-btn
          icon
          :disabled="!hasPrevious"
          @click="
            $router.push({
              query: {
                ...$route.query,
                page: page - 1,
              },
            })
          "
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          icon
          :disabled="!hasNext"
          @click="
            $router.push({
              query: {
                ...$route.query,
                page: page + 1,
              },
            })
          "
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { PROMOLIST } from '../utils/promoList';

import AlumniCard from '../components/AlumniCard.vue';

export default {
  name: 'AlumniList',
  components: {
    AlumniCard,
  },
  data() {
    return {
      loading: false,
      items: [
        { text: 'Nom - croissant', value: 'last_name' },
        { text: 'Nom - décroissant', value: '-last_name' },
        { text: 'Prénom - croissant', value: 'first_name' },
        { text: 'Prénom - décroissant', value: '-first_name' },
      ],
    };
  },
  created() {
    this.alumniList.length < 2 && this.fetchAlumnis();
  },
  methods: {
    ...mapActions('alumnis', ['getAlumnis']),
    fetchAlumnis(query = this.routeQuery) {
      this.loading = true;
      this.getAlumnis(query).finally(() => (this.loading = false));
    },
  },
  // faire appel API lors de la modification de l'url (par query ou params)
  beforeRouteUpdate(to, from, next) {
    this.fetchAlumnis(to.query);
    next();
  },
  computed: {
    ...mapGetters('alumnis', ['alumniList']),
    ...mapState('alumnis', ['hasNext', 'hasPrevious']),
    routeQuery() {
      return this.$route.query;
    },
    page() {
      return Number.parseInt(this.routeQuery.page) || 1;
    },
    fullName() {
      return this.routeQuery.fullName || '';
    },
    promo() {
      return Number.parseInt(this.routeQuery.promo) || null;
    },
    isCaMember() {
      return !!this.routeQuery.isCaMember || false;
    },
    ordering() {
      return this.routeQuery.ordering || null;
    },
    promoListItems() {
      return PROMOLIST.map((promo) => {
        return { value: promo, text: this.$t(`PROMO.${promo}`) };
      });
    },
  },
};
</script>
