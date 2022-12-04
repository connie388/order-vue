<template>
  <div class="flex flex-row">
    <div class="w-1/4">
      <BaseHeader
        label="Product Line List"
        class="font-bold block text-sm text-start"
      />
      <BaseList :options="productlines" @onclick="setActiveProductLine" />
      <BaseButton
        className="btn-green"
        @click="setNewRecord"
        label="+Add Product Line"
      />
    </div>
    <div class="w-3/4">
      <NotificationModal
        :show="visibleMsgView"
        :msg="msg"
        @close="this.visibleMsgView = false"
      />
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
import NotificationModal from "./NotificationModal.vue";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";
export default {
  components: {
    BaseHeader,
    BaseButton,
    BaseList,
    NotificationModal,
    ProductLineForm,
  },
  data() {
    return {
      productlines: [],
      currentProductLine: null,
      newRecord: false,
      visibleMsgView: false,
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
      this.visibleMsgView = false;
      this.newRecord = false;
    },

    setNewRecord() {
      this.newRecord = true;
      this.msg = "";
      this.visibleMsgView = false;
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
          this.visibleMsgView = true;
          this.currentProductLine = null;
          this.retrieveProductLines();
        })
        .catch((err) => console.log(err));
    },

    updateProductLineData(form) {
      var data = {
        productLine: form.productLine,
        textDescription: form.textDescription,
        htmlDescription: form.htmlDescription,
        imageUrl: form.imageUrl,
      };
      createEndpoint(ENDPOINTS.PRODUCTLINE)
        .update(form.productLine, data)
        .then((res) => {
          console.log(res.data);
          this.msg = "Record updated successfully!";
          this.visibleMsgView = true;
        })
        .catch((err) => console.log(err));
    },

    addProductLineData(form) {
      var data = {
        productLine: form.productLine,
        textDescription: form.textDescription,
        htmlDescription: form.htmlDescription,
        imageUrl: form.imageUrl,
      };

      createEndpoint(ENDPOINTS.PRODUCTLINE)
        .create(data)
        .then((res) => {
          console.log(res.data);
          this.retrieveProductLines();
          this.msg = "Record added successfully!";
          this.visibleMsgView = true;
          this.newRecord = false;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
