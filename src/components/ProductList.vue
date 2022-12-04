<template>
  <div class="flex flex-row">
    <div class="w-1/4">
      <BaseHeader
        label="Select Product Line"
        class="font-bold block text-sm text-start"
      />
      <BaseDropdown :options="productlines" @selected="searchByProductLine" />

      <BaseHeader
        label="Product List"
        class="mt-10 font-bold block text-sm text-start"
      />
      <BaseList
        :resetIndex="reset"
        :options="products"
        @onclick="setActiveProduct"
      />
      <BaseButton
        className="btn-green"
        @click="setNewRecord"
        label="+Add Product"
      />
    </div>
    <div class="w-3/4">
      <NotificationModal
        :show="visibleMsgView"
        :msg="msg"
        @close="this.visibleMsgView = false"
      />
      <div v-if="newRecord">
        <BaseHeader label="New Product" />
        <ProductForm :productlines="productlines" @onsubmit="addProductData" />
      </div>
      <div v-else-if="currentProductCode" class="flex flex-row">
        <div class="w-11/12">
          <BaseHeader label="Update Product" />
          <ProductForm
            :productlines="productlines"
            :edit="true"
            :productCode="currentProductCode"
            @onsubmit="updateProductData"
          />
        </div>
        <div class="w-1/12">
          <i
            class="fa-solid fa-trash-can text-xs text-blue-500 hover:text-blue-700 sm:text-3xl md:text-6xl"
            @click="deleteProduct"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "../layouts/BaseHeader.vue";
import BaseButton from "../layouts/BaseButton.vue";
import NotificationModal from "./NotificationModal.vue";
import BaseDropdown from "../layouts/BaseDropdown.vue";
import BaseList from "../layouts/BaseList.vue";
import ProductForm from "./ProductForm";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";
export default {
  components: {
    BaseHeader,
    BaseButton,
    BaseDropdown,
    BaseList,
    NotificationModal,
    ProductForm,
  },
  data() {
    return {
      productlines: [],
      products: [],
      currentProductCode: null,
      newRecord: false,
      searchProductLine: "",
      reset: false,
      visibleMsgView: false,
      msg: "Please click on a Product to view, update or delete",
    };
  },

  mounted() {
    this.retrieveProductLines();
  },
  methods: {
    setActiveProduct(option) {
      this.currentProductCode = option.key;
      this.msg = "";
      this.newRecord = false;
      this.visibleMsgView = false;
    },

    retrieveProductLines() {
      this.productlines = [];
      createEndpoint(ENDPOINTS.PRODUCTLINE)
        .fetchAll()
        .then((res) => {
          for (let record in res.data) {
            var temp = {
              key: res.data[record].productLine,
              text: res.data[record].productLine,
            };
            this.productlines.push(temp);
          }
        })
        .catch((err) => console.log(err));
    },

    setNewRecord() {
      this.newRecord = true;
      this.msg = "";
      this.visibleMsgView = false;
      this.currentProductCode = null;
      this.currentIndex = -1;
    },

    searchByProductLine(option) {
      this.searchProductLine = option.key;
      this.findByProductLine();
    },

    findByProductLine() {
      this.products = [];
      this.reset = !this.reset;
      createEndpoint(ENDPOINTS.PRODUCT)
        .fetchAllByCategory(this.searchProductLine)
        .then((res) => {
          for (let record in res.data) {
            var tempProduct = {
              key: res.data[record].productCode,
              text: res.data[record].productCode,
            };
            this.products.push(tempProduct);
          }
        })
        .catch((err) => console.log(err));
    },

    deleteProduct() {
      createEndpoint(ENDPOINTS.PRODUCT)
        .delete(this.currentProductCode)
        .then((res) => {
          console.log(res.data);
          this.msg = "Record deleted successfully!";
          this.visibleMsgView = true;
          this.currentProductCode = null;
          if (this.searchProductLine) this.findByProductLine();
        })
        .catch((err) => console.log(err));
    },

    updateProductData(form) {
      var data = {
        productLine: form.productLine,
        productCode: form.productCode,
        productName: form.productName,
        productScale: form.productScale,
        productVendor: form.productVendor,
        productDescription: form.productDescription,
        quantityInStock: form.quantityInStock,
        buyPrice: form.buyPrice,
        msrp: form.msrp,
      };
      createEndpoint(ENDPOINTS.PRODUCT)
        .update(form.productCode, data)
        .then((res) => {
          console.log(res.data);
          this.msg = "Record updated successfully!";
          this.visibleMsgView = true;
        })
        .catch((err) => console.log(err));
    },

    addProductData(form) {
      var data = {
        productLine: form.productLine,
        productCode: form.productCode,
        productName: form.productName,
        productScale: form.productScale,
        productVendor: form.productVendor,
        productDescription: form.productDescription,
        quantityInStock: form.quantityInStock,
        buyPrice: form.buyPrice,
        msrp: form.msrp,
      };

      createEndpoint(ENDPOINTS.PRODUCT)
        .create(data)
        .then((res) => {
          console.log(res.data);
          if (this.searchProductLine) this.findByProductLine();
          this.msg = "Record added successfully!";
          this.visibleMsgView = true;
          this.newRecord = false;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
