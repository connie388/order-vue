<template>
  <label v-if="label" :for="id" :class="labelClass">
    {{ label }}
  </label>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    @input="updateInput"
    :class="inputClassName"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    labelClass: {
      type: String,
      default: "field-label",
    },
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    className: {
      type: String,
      default: "field-input",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },

  computed: {
    inputClassName() {
      if (this.disabled) return "field";
      return this.className;
    },
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
