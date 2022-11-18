<template>
  <label v-if="label" :for="id" :class="labelClass">
    {{ label }}
  </label>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    @input="updateInput"
    :class="className"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    labelClass: {
      type: String,
      default: "text-left font-bold block text-sm my-2",
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
      default: "border w-full text-xs my-2",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
