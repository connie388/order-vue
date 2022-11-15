<template>
  <div class="flex flex-row">
    <div class="w-1/4">
      <BaseHeader
        label="Product Line List"
        class="font-bold block text-4xl text-start"
      />
      <BaseList :options="productlines" @onclick="setActiveProductLine" />
      <BaseButton @click="setNewRecord" label="Add" />
    </div>
    <div class="w-3/4">
      <div>
        <p>{{ msg }}</p>
      </div>
      <div v-if="newRecord">
        <BaseHeader label="New Product Line" />
        <ProductLineForm @onsubmit="addProductLineData" />
      </div>
      <div v-else-if="currentProductLine" class="flex flex-row">
        <div class="w-11/12">
          <BaseHeader label="Update Product Line" />
          <ProductLineForm
            :disabled="true"
            :pline="currentProductLine"
            @onsubmit="updateProductLineData"
          />
        </div>
        <div class="w-1/12">
          <i
            class="fa-solid fa-trash-can text-xs text-blue-500 hover:text-blue-700 sm:text-3xl md:text-6xl"
            @click="deleteProductLine"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "../layouts/BaseHeader.vue";
import BaseButton from "../layouts/BaseButton.vue";
import ProductLineForm from "./ProductLineForm";
import BaseList from "../layouts/BaseList.vue";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";
export default {
  components: {
    BaseHeader,
    BaseButton,
    BaseList,
    ProductLineForm,
  },
  data() {
    return {
      productlines: [],
      currentProductLine: null,
      newRecord: false,
      msg: "Please click on a Product Line to view, update or delete",
    };
  },

  mounted() {
    this.retrieveProductLines();
  },

  methods: {
    setActiveProductLine(option) {
      this.currentProductLine = option.key;
      this.msg = "";
      this.newRecord = false;
    },

    setNewRecord() {
      this.newRecord = true;
      this.msg = "";
      this.currentProductLine = null;
    },

    retrieveProductLines() {
      this.productlines = [];
      createEndpoint(ENDPOINTS.PRODUCTLINE)
        .fetchAll()
        .then((res) => {
          for (let record in res.data) {
            var tempProductLine = {
              key: res.data[record].productLine,
              text: res.data[record].productLine,
            };
            this.productlines.push(tempProductLine);
          }
        })
        .catch((err) => console.log(err));
    },

    deleteProductLine() {
      createEndpoint(ENDPOINTS.PRODUCTLINE)
        .delete(this.currentProductLine)
        .then((res) => {
          console.log(res.data);
          this.msg = "Record deleted successfully!";
          this.currentProductLine = null;
          this.retrieveProductLines();
        })
        .catch((err) => console.log(err));
    },

    updateProductLineData(form) {
      var data = {
        productLine: form.productLine,
        textDesc: form.textDesc,
        htmlDesc: form.htmlDesc,
        imageUrl: form.imageUrl,
      };
      createEndpoint(ENDPOINTS.PRODUCTLINE)
        .update(form.productLine, data)
        .then((res) => {
          console.log(res.data);
          this.msg = "Record updated successfully!";
        })
        .catch((err) => console.log(err));
    },

    addProductLineData(form) {
      var data = {
        productLine: form.productLine,
        textDesc: form.textDesc,
        htmlDesc: form.htmlDesc,
        imageUrl: form.imageUrl,
      };

      createEndpoint(ENDPOINTS.PRODUCTLINE)
        .create(data)
        .then((res) => {
          console.log(res.data);
          this.retrieveProductLines();
          this.msg = "Record added successfully!";
          this.newRecord = false;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
