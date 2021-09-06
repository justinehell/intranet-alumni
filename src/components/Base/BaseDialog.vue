<template>
  <v-dialog v-model="dialog" scrollable max-width="600px">
    <!-- :value="dialog"
    @input="dialog = $event" -->
    <template
      v-if="openDialogButtonIcon || openDialogButtonText"
      v-slot:activator="{ on, attrs }"
    >
      <slot name="openDialogButton">
        <v-btn
          class="mx-2"
          :fab="!!openDialogButtonIcon"
          small
          dark
          color="indigo"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon v-if="openDialogButtonIcon" dark>
            {{ openDialogButtonIcon }}
          </v-icon>
          <template v-if="openDialogButtonText">
            {{ openDialogButtonText }}
          </template>
        </v-btn>
      </slot>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click.stop="dialog = false">{{
          $t('action.cancel')
        }}</v-btn>
        <v-btn
          color="blue darken-1"
          @click="$emit('submit')"
          depressed
          :loading="loading"
          :disabled="isSubmitButtonDisabled"
        >
          {{ submitText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    openDialogButtonIcon: {
      type: String,
    },
    openDialogButtonText: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    submitText: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isSubmitButtonDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {},
  watch: {
    dialog(val) {
      this.$emit(`dialog:${val ? 'open' : 'close'}`);
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    openDialog() {
      this.dialog = true;
    },
  },
};
</script>
