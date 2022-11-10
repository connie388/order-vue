<template>
  <label v-if="label" :for="id" class="my-2 font-bold block">
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
    modelValue: {
      type: [String, Number],
      default: "",
    },
    className: {
      type: String,
      default: "border w-full my-2",
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
