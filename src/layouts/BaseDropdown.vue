<template>
  <label v-if="label" :for="id" :class="labelClass">
    {{ label }}
  </label>
  <select :class="className" v-model="selectedOption" @change="onchange">
    <option value="">Please Select One</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  emits: ["selected"],
  props: {
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
      default: "field",
    },
  },
  data() {
    return {
      selectedOption: "",
    };
  },
  methods: {
    onchange() {
      if (this.selectedOption) this.$emit("selected", this.selectedOption);
    },
  },
};
</script>
