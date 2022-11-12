<template>
  <button
    :id="id"
    :class="className"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "BaseButton",
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
      default: "m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
};
</script>
