<template>
  <label v-if="label" :for="id" :class="labelClass">
    {{ label }}
  </label>
  <textarea
    :id="id"
    :value="modelValue"
    @input="updateInput"
    :class="className"
    :rows="row"
  />
</template>

<script>
export default {
  name: "BaseTextArea",
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
    modelValue: {
      type: [String, Number],
      default: "",
    },
    className: {
      type: String,
      default: "field-input",
    },
    row: {
      type: Number,
      default: 4,
    },
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
