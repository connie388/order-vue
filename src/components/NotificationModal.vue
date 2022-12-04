<template>
  <BaseModal
    :showing="show"
    modalContainerClass="modal-notify-container"
    modalContentClass="modal-notify-content"
    :closeButtonEnable="true"
    @close="close"
  >
    <template v-slot:body>
      <p>{{ msg }}</p>
    </template>
  </BaseModal>
</template>
<script>
import BaseModal from "../layouts/BaseModal.vue";

export default {
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    msg: {
      type: String,
      default: "",
    },
  },
  components: {
    BaseModal,
  },
};
</script>
