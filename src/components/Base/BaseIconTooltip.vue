<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon right :color="color" v-bind="attrs" v-on="on">{{ icon }}</v-icon>
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'BaseIconTooltip',
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
