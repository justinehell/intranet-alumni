<template>
  <div id="container" class="d-flex">
    <div>
      <label :for="option" v-for="(option, i) in options" :key="i">
        <input
          type="radio"
          name="radio-input"
          :checked="true"
          :value="option"
          :id="option"
          @change="$emit('input', option)"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseRadio',
  props: {
    options: {
      required: true,
      type: Array,
    },
  },
};
</script>
