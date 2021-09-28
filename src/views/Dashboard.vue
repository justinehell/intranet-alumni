<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Components</h1>
        <!-- <BaseInput id="1" v-model="input1" filled clearable label="Label" />
        <BaseInput id="2" v-model="input2" outlined clearable label="Label" />
        <BaseInput
          id="3"
          v-model="input3"
          :error="error"
          clearable
          prependIcon
          label="Label"
        />
        <BaseInput id="4" v-model="input4" label="Label" /> -->

        <!--  ALSO :
          <BaseInput :value="input1" @input="input1 = $event" />
          <BaseInput :value="input1" @input="(val) => (input1 = val)" />
            {{ input1 }} 
        -->

        <BaseInput
          id="1"
          v-model="input1"
          label="Label"
          :filled="pickedStyle === 'filled'"
          :outlined="pickedStyle === 'outlined'"
          :prependIcon="pickedIcon === 'prepend'"
          :appendIcon="pickedIcon === 'append'"
          :clearable="clearable"
          :error="showErrorMessage && error"
        />
        <div class="box">
          <h3>
            Styles : <span>{{ pickedStyle }}</span>
          </h3>
          <BaseRadio v-model="pickedStyle" :options="styles" />
        </div>

        <div class="box">
          <h3>
            Icons : <span>{{ pickedIcon }}</span>
          </h3>
          <BaseRadio v-model="pickedIcon" :options="icons" />
        </div>

        <div class="box">
          <h3>
            Clearable : <span>{{ clearable }}</span>
          </h3>
          <BaseRadio v-model="clearable" :options="options" />
        </div>

        <div class="box">
          <h3>
            Error Message : <span>{{ showErrorMessage }}</span>
          </h3>
          <BaseRadio v-model="showErrorMessage" :options="options" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseInput from '../components/Base/BaseInput.vue';
import BaseRadio from '../components/Base/BaseRadio.vue';
export default {
  name: 'Dashboard',
  components: {
    BaseInput,
    BaseRadio,
  },
  data() {
    return {
      model: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      pickedStyle: '',
      styles: ['filled', 'outlined', 'default'],
      pickedIcon: '',
      icons: ['append', 'prepend', 'no icon'],
      clearable: null,
      showErrorMessage: null,
      options: [true, false],
      error: 'Error message !! please do something',
    };
  },
  methods: {},
};
</script>
<style scoped>
.box {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-left: 12em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
  max-width: 400px;
}
span {
  font-weight: 300;
  font-style: italic;
}
</style>
