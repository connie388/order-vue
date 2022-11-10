<template>
  <form @submit.prevent>
    <BaseInput
      id="productLine"
      label="Product Line"
      v-model="form.productLine"
    />

    <BaseTextArea
      id="textDesc"
      label="Text Description"
      v-model="form.textDesc"
    />

    <BaseTextArea
      id="htmlDesc"
      label="HTML Description"
      v-model="form.htmlDesc"
    />

    <BaseInput id="image" label="Image" v-model="form.image" />

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="onsubmit"
    >
      Submit
    </button>
  </form>
</template>
<script>
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";
import BaseInput from "../layouts/BaseInput.vue";
import BaseTextArea from "../layouts/BaseTextArea.vue";

export default {
  emits: ["onsubmit"],
  components: {
    BaseInput,
    BaseTextArea,
  },
  props: ["pline"],
  data() {
    return {
      form: {
        productLine: null,
        textDesc: "",
        htmlDesc: "",
        image: "",
      },
      submitted: false,
    };
  },

created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.pline,
      () => {
        this.getProductLine();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },

  methods: {
    onsubmit() {
      this.$emit("onsubmit", this.form);
    },

    getProductLine() {
      createEndpoint(ENDPOINTS.PRODUCTLINE)
        .fetchById(this.pline)
        .then((res) => {
          this.form.productLine = res.data.productLine;
          this.form.textDesc = res.data.textDesc;
          this.form.htmlDesc = res.data.htmlDesc;
          this.form.image = res.data.image;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
