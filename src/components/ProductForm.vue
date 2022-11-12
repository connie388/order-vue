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

    <BaseInput
      id="productCode"
      label="Product Code"
      :disabled = "disabled"
      v-model="form.productCode"
    />

  <BaseInput
      id="productName"
      label="Product Name"
      v-model="form.productName"
    />

    <BaseInput
      id="productScale"
      label="Product Scale"
      v-model="form.productScale"
    />

    <BaseInput
      id="productVendor"
      label="Product Vendor"
      v-model="form.productVendor"
    />


    <BaseTextArea
      id="productDesc"
      label="Product Description"
      v-model="form.productDesc"
    />

    <BaseInput
      id="quantityInStock"
      label="Quantity In Stock"
      v-model="form.quantityInStock"
    />

    <BaseInput
      id="buyPrice"
      label="Buy Price"
      v-model="form.buyPrice"
    />

    <BaseInput
      id="msrp"
      label="MSRP"
      v-model="form.msrp"
    />
    <BaseButton @click="onsubmit" label="Submit"/>
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
  props: ["productCode", "disabled"],
  data() {
    return {
      form: {
        productLine: null,
        productCode: "",
        productName: "",
        productScale: "",
        productVendor: "",
        productDesc: "",
        buyPrice: null,
        quantityInStock: null,
        msrp: null,
      },
      errors: [],
    };
  },

created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.productCode,
      () => {
        this.getProduct();
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
       if (!this.form.productCode) {
        this.errors.push('Product Code required.');
      }
       if (!this.form.productName) {
        this.errors.push('Product Name required.');
      } if (!this.form.productScale) {
        this.errors.push('Product Scale required.');
      } if (!this.form.productVendor) {
        this.errors.push('Product Vendor required.');
      } if (!this.form.productDesc) {
        this.errors.push('Product Description required.');
      } if (!this.form.buyPrice) {
        this.errors.push('Product Buy Price required.');
      } if (!this.form.msrp) {
        this.errors.push('MSRP required.');
       } if (!this.form.quantityInStock) {
        this.errors.push('Quantity In Stock required.');
      }
      // if (this.form.imageUrl && !this.validImageURL(this.form.imageUrl)) {
      //   this.errors.push('Image URL is invalid.');
      // }

      if (this.errors.length) {
        return;
      }

      e.preventDefault();     
      this.$emit("onsubmit", this.form);
    },

    // validImageURL: function (imageURL) {
    //   var re = /^(https?:\/\/)?[0-9a-zA-Z]+\.[-_0-9a-zA-Z]+\.[0-9a-zA-Z]+$/;
    //   return re.test(imageURL);
    // },

    getProduct() {
      createEndpoint(ENDPOINTS.PRODUCT)
        .fetchById(this.productCode)
        .then((res) => {
          this.form.productLine = res.data.productLine;
          this.form.productCode = res.data.productCode;
          this.form.productName = res.data.productName;
          this.form.productScale = res.data.productScale;
          this.form.productVendor = res.data.productVendor;
          this.form.productDesc = res.data.productDesc;
          this.form.buyPrice = res.data.buyPrice;
          this.form.quantityInStock = res.data.quantityInStock;
          this.form.msrp = res.data.msrp;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
