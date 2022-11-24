<template>
  <Transition name="fade">
    <div v-if="showing" :class="modalContainerClass">
      <div :class="modalContentClass">
        <header
          class="px-4 py-6 flex justify-between items-center border-b-2 border-white"
          id="modalTitle"
        >
          <slot name="header"></slot>
          <i
            class="fa-solid fa-xmark w-7 p-2 bg-gray-300 rounded-full"
            @click="close"
          ></i>
        </header>

        <main class="px-4 py-6" id="modalDescription">
          <slot name="body"></slot>
        </main>

        <!-- <footer class="px-4 py-6 border-t-2 border-white">
          <slot name="footer"></slot>
          <BaseButton @click.prevent="close" label="Close" />
        </footer> -->
      </div>
    </div>
  </Transition>
</template>

<script>
// import BaseButton from "./BaseButton";
export default {
  name: "BaseModal",
  emits: ["close"],
  // components: {
  //   BaseButton,
  // },
  methods: {
    close() {
      this.$emit("close");
    },
  },

  props: {
    modalContainerClass: {
      type: String,
      default:
        "fixed inset-0 w-full h-screen flex items-center justify-center bg-[#000000da]",
    },
    modalContentClass: {
      type: String,
      default:
        "overflow-auto rounded-3xl bg-white flex flex-col justify-between w-4/6 h-5/6",
    },
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
