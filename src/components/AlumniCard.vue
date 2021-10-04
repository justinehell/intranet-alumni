<template>
  <v-card
    :to="{
      name: 'AlumniDetail',
      params: { id: alumni.id },
    }"
  >
    <v-card-title class="text-h6 primary--text">
      {{ `${alumni.firstName} ${alumni.lastName}` }}

      <BaseIconTooltip
        v-if="alumni.isCaMember"
        icon="mdi-account-tie"
        :text="$t('alumni.isCaMember.tag')"
      />

      <BaseIconTooltip
        v-if="alumni.isContributor"
        icon="mdi-seal-variant"
        :text="$t('alumni.isContributor.tag')"
      />
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
