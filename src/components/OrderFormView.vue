<template>
  <div class="flex flex-row">
    <div class="w-1/2">
      <div v-if="orderAllFields">
        <div :key="index" v-for="(item, index) in orderAllFields">
          <BaseLabel
            id="index"
            :label="item.header"
            :info="computedData(item.column)"
          />
        </div>
      </div>
    </div>
    <div class="w-1/2">
      <div class="overflow-auto">
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
    </div>
  </div>
</template>
<script>
import BaseLabel from "../layouts/BaseLabel.vue";
import BaseTable from "../layouts/BaseTable.vue";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";

export default {
  props: {
    //
    data: {
      type: Array,
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
      () => this.data[0]["orderNumber"],
      () => {
        if (this.data[0]["orderNumber"])
          this.retrieveOrderDetail(this.data[0]["orderNumber"]);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },

  methods: {
    computedData(col) {
      return this.data[0][col]?.toString();
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
