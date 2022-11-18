<template>
  <label v-if="label" :for="id" :class="labelClass">
    {{ label }}
  </label>
  <select :class="className" v-model="selectedOption" @change="onchange">
    <option value="">Please Select One</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  emits: ["selected"],
  props: {
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "font-bold block text-sm my-2",
    },
    options: {
      type: Array,
      required: true,
    },
    className: {
      type: String,
      default: "text-left w-full text-xs my-2",
    },
  },
  data() {
    return {
      selectedOption: "",
    };
  },
  methods: {
    onchange() {
      if (this.selectedOption) this.$emit("selected", this.selectedOption);
    },
  },
};
</script>
