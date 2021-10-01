<template>
  <v-card
    :to="{
      name: 'AlumniDetail',
      params: { id: alumni.id },
    }"
  >
    <v-card-title class="text-h6 primary--text">
      {{ `${alumni.firstName} ${alumni.lastName}` }}

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-if="alumni.isCaMember"
            right
            color="primary"
            v-bind="attrs"
            v-on="on"
            >mdi-account-tie</v-icon
          >
        </template>
        <span>{{ $t('alumni.isCaMember') }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-if="alumni.isContributor"
            right
            color="primary"
            v-bind="attrs"
            v-on="on"
            >mdi-seal-variant</v-icon
          >
        </template>
        <span>{{ $t('alumni.isContributor') }}</span>
      </v-tooltip>
    </v-card-title>
    <v-img contain height="200px" src="@/assets/images/alumni/alumni-2.png">
    </v-img>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn small color="secondary" outlined>{{ $t('action.seeMore') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'AlumniCard',
  props: {
    alumni: {
      type: Object,
      required: true,
    },
  },
};
</script>
