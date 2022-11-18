<template>
  <label v-if="label" :for="id" :class="className">
    {{ label }}
  </label>
  <label v-if="info" class="ml-2 text-left w-full text-xs my-2">
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
      default: "font-bold block text-sm my-2",
    },
  },
};
</script>
