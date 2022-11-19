<template>
  <h4>
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
      default: "field-label",
    },
  },
};
</script>
