<template>
  <form @submit.prevent>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
     </ul>
    </p>

    <BaseInput
      id="productLine"
      label="Product Line"
      :disabled = "disabled"
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

    <BaseInput id="image" label="Image URL" v-model="form.imageUrl"/>

    <img class="object-cover h-48 w-96"  :src="form.imageUrl" alt="Product Line img">

    <BaseButton @click="onsubmit" label="Submit" />
  </form>
</template>
<script>
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";
import BaseInput from "../layouts/BaseInput.vue";
import BaseButton from "../layouts/BaseButton.vue";
import BaseTextArea from "../layouts/BaseTextArea.vue";

export default {
  emits: ["onsubmit"],
  components: {
    BaseInput,
    BaseButton,
    BaseTextArea,
  },
  props: ["pline", "disabled"],
  data() {
    return {
      form: {
        productLine: null,
        textDesc: "",
        htmlDesc: "",
        imageUrl: "",
      },
      errors: [],
    };
  },

  created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.pline,
      () => {
        if (this.pline) this.getProductLine();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },

  methods: {
    onsubmit(e) {
      this.errors = [];
      if (!this.form.productLine) {
        this.errors.push('Product Line required.');
      }
      if (this.errors.length) {
        return;
      }
      e.preventDefault();     
      this.$emit("onsubmit", this.form);
    },

    getProductLine() {
      createEndpoint(ENDPOINTS.PRODUCTLINE)
        .fetchById(this.pline)
        .then((res) => {
          this.form.productLine = res.data.productLine;
          this.form.textDesc = res.data.textDesc;
          this.form.htmlDesc = res.data.htmlDesc;
          this.form.imageUrl = res.data.imageUrl;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
