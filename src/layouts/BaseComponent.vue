<template>
  <component :is="type" :href="href" :to="to" :class="className">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: null,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    type() {
      if (this.href) {
        return "a";
      } else if (this.to) {
        return "router-link";
      } else {
        return "button";
      }
    },
  },
};
</script>
