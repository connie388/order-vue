<template>
  <label v-if="label" :for="id" class="font-bold block my-2">
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
      default: "border w-full my-2",
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
