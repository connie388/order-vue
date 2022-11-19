<template>
  <label v-if="label" :for="id" :class="className">
    {{ label }}
  </label>
  <label v-if="info" :class="infoClassName">
    {{ info }}
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
    info: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "field-label",
    },
    infoClassName: {
      type: String,
      default: "field",
    },
  },
};
</script>
