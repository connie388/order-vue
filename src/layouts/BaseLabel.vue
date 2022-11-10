<template>
  <label v-if="label" :for="id" :class="className">
    {{ label }}
  </label>
</template>

<script>
export default {
  name: "BaseLabel",
  props: {
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "font-bold block my-2",
    },
  },
};
</script>
