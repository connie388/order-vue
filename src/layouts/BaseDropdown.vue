<template>
  <div>
    <label v-if="label" :for="id" :class="labelClass">
      {{ label }}
    </label>
    <select :class="className" v-model="selectedOption" @change="onchange">
      <option :value="selectedOption?.key || ''">
        {{ selectedOption?.text || "Please select one." }}
      </option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option?.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  emits: ["selected"],
  props: {
    initialOption: {
      type: Object,
      default: null,
    },
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "field-label",
    },
    options: {
      type: Array,
      required: true,
    },
    className: {
      type: String,
      default: "field-input",
    },
  },
  data() {
    return {
      selectedOption: "",
    };
  },
  created() {
    this.selectedOption = this.initialOption;
  },
  methods: {
    onchange() {
      if (this.selectedOption) this.$emit("selected", this.selectedOption);
    },
  },
};
</script>
