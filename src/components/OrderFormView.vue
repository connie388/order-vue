<template>
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <BaseLabel
        id="customerName"
        label="Customer Name"
        :info="order.customerName"
      />
    </div>

    <div
      class="w-full md:w-1/3 px-3 mb-6 md:mb-0"
      :key="index"
      v-for="(item, index) in orderAllFields"
    >
      <BaseLabel
        id="index"
        :label="item.header"
        :info="computedData(item.column)"
      />
    </div>
  </div>

  <div class="overflow-auto">
    <br />
    <BaseTable
      :fields="orderProductsFields"
      :dataList="orderDetails"
      :viewEnable="false"
      :editEnable="false"
      :deleteEnable="false"
      :reset="reset"
      :filterEnable="false"
    />
  </div>
</template>
<script>
import BaseLabel from "../layouts/BaseLabel.vue";
import BaseTable from "../layouts/BaseTable.vue";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";

export default {
  props: {
    //
    order: {
      type: Object,
    },

    fields: {
      type: Array,
    },
    detailFields: {
      type: Array,
    },
  },

  setup() {
    const orderAllFields = [
      { column: "orderNumber", header: "Order Number" },
      { column: "orderDate", header: "Order Date" },
      { column: "requiredDate", header: "Required Date" },
      { column: "shippedDate", header: "Shipped Date" },
      { column: "status", header: "Status" },
      { column: "comments", header: "Comments" },
      { column: "createdAt", header: "Created At" },
      { column: "updatedAt", header: "Updated At" },
    ];

    const orderProductsFields = [
      { column: "productCode", header: "Product Code" },
      { column: "quantityOrdered", header: "Quantity" },
      { column: "priceEach", header: "Price Each" },
    ];
    return {
      orderAllFields,
      orderProductsFields,
    };
  },

  components: {
    BaseLabel,
    BaseTable,
  },
  data() {
    return {
      orderDetails: [],
      reset: false,
    };
  },

  created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.order["orderNumber"],
      () => {
        if (this.order["orderNumber"])
          this.retrieveOrderDetail(this.order["orderNumber"]);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },

  methods: {
    computedData(col) {
      return this.order[col]?.toString();
    },
    retrieveOrderDetail(orderNumber) {
      this.orderDetails = [];
      createEndpoint(ENDPOINTS.ORDER_DETAIL)
        .fetchById(orderNumber)
        .then((res) => {
          this.orderDetails = JSON.parse(JSON.stringify(res.data));
        })
        .catch((err) => console.log(err));
      this.reset = !this.reset;
    },
  },
};
</script>
