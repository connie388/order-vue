<template>
  <h4 :class="className">
    {{ label }}
  </h4>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    label: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "my-2 font-bold block text-4xl text-center",
    },
  },
};
</script>
