<template>
  <ul>
    <li
      :class="{ active: index == this.currentIndex }"
      v-for="(option, index) in options || []"
      :key="index"
      @click="onclick(option, index)"
    >
      <p :class="className">{{ option.text }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BaseList",
  emits: ["onclick"],
  props: {
    options: {
      type: Array,
      required: true,
    },
    className: {
      type: String,
      default: "field text-left",
    },
    resetIndex: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentIndex: -1,
    };
  },
  methods: {
    onclick(option, index) {
      this.currentIndex = index;
      this.$emit("onclick", option);
    },
  },
  created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.resetIndex,
      () => {
        this.currentIndex = -1;
      },
      { immediate: true }
    );
  },
};
</script>
