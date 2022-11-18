<template>
  <Transition name="fade">
    <div
      v-if="showing"
      class="overflow-auto fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75"
    >
      <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <slot />
        <header class="relative" id="modalTitle">
          <slot name="header"></slot>
          <i
            class="fa-solid fa-xmark absolute top-0 right-0"
            @click="close"
          ></i>
        </header>

        <main class="relative" id="modalDescription">
          <slot name="body"></slot>
        </main>

        <footer class="flex-col justify-end">
          <div class="items-center">
            <slot name="footer"></slot>
            <BaseButton @click.prevent="close" label="Close" />
          </div>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script>
import BaseButton from "./BaseButton";
export default {
  name: "BaseModal",
  components: {
    BaseButton,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },

  props: {
    showing: {
      required: true,
      type: Boolean,
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
