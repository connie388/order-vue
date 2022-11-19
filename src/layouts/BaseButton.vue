<template>
  <button :id="id" :class="className" :disabled="disabled">
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
      default: "btn-primary mx-auto",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
