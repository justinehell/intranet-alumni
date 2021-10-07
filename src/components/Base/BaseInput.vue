<template>
  <div class="box d-flex">
    <div v-if="prependIcon" class="mr-2 mt-4">
      <i class="fas fa-clock icon" title="prepend-icon"></i>
    </div>
    <div id="input-error-container">
      <div
        id="input-container"
        :class="[`d-flex`, inputContainerClass]"
        @click="focusInput"
      >
        <div class="d-flex relative min-h-14">
          <input
            :id="`input${id}`"
            class="input max-h-8"
            :style="inputStyle"
            type="text"
            :name="name"
            :value="internalValue"
            role="input"
            @input="$emit('input', $event.target.value)"
          />
          <label :class="labelClass" :for="`input${id}`">
            {{ label || '' }}
          </label>
          <div class="w-6" :style="clearInputButtonContainerStyle">
            <button
              v-if="clearable && value"
              @click="internalValue = ''"
              role="clear-input"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                fill="royalblue"
              >
                <path
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <p class="error-message">
          {{ error || '' }}
        </p>
      </div>
    </div>
    <div v-if="appendIcon" class="mt-4 ml-2">
      <i class="fas fa-clock icon" title="append-icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    prependIcon: {
      type: Boolean,
    },
    appendIcon: {
      type: Boolean,
    },
    clearable: {
      type: Boolean,
    },
    filled: {
      type: Boolean,
    },
    outlined: {
      type: Boolean,
    },
    label: {
      type: String,
    },
    error: {
      type: [String, Boolean],
    },
  },
  data() {
    return {
      internalValue: this.value,
    };
  },
  watch: {
    internalValue(val) {
      if (val !== this.value) {
        this.$emit('input', val);
      }
    },
  },
  computed: {
    name() {
      return this.label && this.label.toLowerCase();
    },
    labelClass() {
      return {
        'smallLabel--outlined': this.value && this.outlined,
        'smallLabel--filled': this.value && this.filled,
        'label--outlined': this.outlined,
        'label--filled': this.filled,
        label: !this.filled && !this.outlined,
        smallLabel: this.value && !this.filled && !this.outlined,
      };
    },
    inputContainerClass() {
      return {
        'input-container': !this.filled && !this.outlined,
        'input-container--filled': this.filled,
        'input-container--outlined': this.outlined,
      };
    },
    inputStyle() {
      return this.outlined ? 'margin: auto' : 'margin-top: 22px;';
    },
    clearInputButtonContainerStyle() {
      return this.outlined
        ? 'align-self: center; height: 24px'
        : 'align-self: end';
    },
  },
  methods: {
    focusInput() {
      document.getElementById(`input${this.id}`).focus();
    },
  },
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
.font-size-24 {
  font-size: 24px;
}
.min-h-14 {
  min-height: 56px;
}
.max-h-8 {
  max-height: 32px;
}
.w-6 {
  width: 24px;
}
.icon {
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
}
.error-message {
  min-height: 14px;
  color: red;
  font-size: 12px;
  margin-bottom: 0;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}
.input-container {
  border-bottom: 1px solid;
}

.input-container--filled {
  border-bottom: 1px solid;
  border-radius: 4px 4px 0 0;
  background: rgba(0, 0, 0, 0.06);
  min-height: 56px;
  padding: 0 12px;
  transition: background-color 300ms;
}
.input-container--filled:hover {
  cursor: text;
  background: rgba(0, 0, 0, 0.12);
}

.input-container--outlined {
  border-radius: 4px;
  border: 1px solid lightgray;
  min-height: 56px;
  padding: 0 12px;
  transition: border 100ms;
}
.input-container--outlined:hover {
  cursor: text;
  border: 1px solid rgba(0, 0, 0, 0.856);
}
.label,
.label--filled,
.label--outlined {
  position: absolute;
  color: inherit;
  top: 18px;
  font-size: 16px;
  transition: all 300ms;
}

.input:focus + .label,
.input:focus + .label--filled {
  font-size: 12px;
  color: royalblue;
  top: 11px;
}

.input:focus + .label--outlined {
  position: absolute;
  color: royalblue;
  top: -10px;
  font-size: 12px;
  background: white;
  padding: 0 4px;
}

.smallLabel--outlined {
  font-size: 12px;
  color: royalblue;
  top: -10px;
  background: white;
  padding: 0 4px;
}
.smallLabel,
.smallLabel--filled {
  font-size: 12px;
  color: royalblue;
  top: 11px;
}
</style>
