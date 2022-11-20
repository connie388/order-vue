<template>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul class="text-red-500">
        <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
</template>

<script>
export default {
  name: "BaseErrors",
  props: {
    errors: {
        type: Array,
        default: null,
    }
  },
};
</script>
