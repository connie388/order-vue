<template>
  <form @submit.prevent class="w-full">
    <BaseErrors :errors="errors" />

    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput
          type="hidden"
          id="customerNumber"
          v-model="form.customerNumber"
        />

        <BaseInput
          id="customerName"
          :disabled="true"
          label="Customer Name"
          v-model="form.customerName"
        />
        <!-- </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0"> -->
        <BaseInput
          id="orderNumber"
          :disabled="true"
          label="Order Number"
          v-model="form.orderNumber"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseDropdown
          :initialOption="{ key: order.status, text: order.status }"
          id="status"
          :options="options"
          label="Status"
          @selected="setStatus"
        />
      </div>
      <!-- </div>
    <div class="flex flex-wrap -mx-3 mb-2"> -->
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput id="orderDate" label="Order Date" v-model="form.orderDate" />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput
          id="requiredDate"
          label="Required Date"
          v-model="form.requiredDate"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput
          id="shippedDate"
          label="Shipped Date"
          v-model="form.shippedDate"
        />
      </div>
      <!-- </div>

    <div class="flex flex-wrap -mx-3 mb-6"> -->
      <div class="w-full px-3">
        <BaseTextArea id="comments" label="Comments" v-model="form.Comments" />
      </div>
    </div>
    <div class="w-full">
      <div class="overflow-auto">
        <div v-if="editable">
          <BaseTable
            :fields="orderDetailFields"
            :dataList="orderDetails"
            :filterEnable="false"
          />
        </div>
        <div v-else>
          <BaseTable
            :fields="orderDetailFields"
            :dataList="orderDetails"
            :viewEnable="false"
            :editEnable="false"
            :deleteEnable="false"
            :filterEnable="false"
          />
        </div>
      </div>
    </div>
    <BaseButton @click="onsubmit" label="Submit" />
  </form>
</template>

<script>
import BaseErrors from "../layouts/BaseErrors.vue";
import BaseTextArea from "../layouts/BaseTextArea.vue";
import BaseButton from "../layouts/BaseButton.vue";
import BaseDropdown from "../layouts/BaseDropdown.vue";
import BaseTable from "../layouts/BaseTable.vue";
import BaseInput from "../layouts/BaseInput.vue";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";
import { ORDER_STATUS } from "@/components/OrderStatus";

export default {
  components: {
    BaseErrors,
    BaseTextArea,
    BaseButton,
    BaseDropdown,
    BaseTable,
    BaseInput,
  },
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  computed: {
    editable() {
      return this.order.status === ORDER_STATUS.IN_PROCESS;
    },
  },
  data() {
    return {
      form: {
        customerName: "",
        customerNumber: null,
        orderNumber: null,
        orderDate: null,
        requiredDate: null,
        shippedDate: null,
        status: "",
        comments: "",
      },
      errors: [],
      options: null,
      orderDetails: [],
    };
  },

  setup() {
    const orderDetailFields = [
      { column: "orderNumber", header: "Order Number" },
      { column: "productCode", header: "Product Code" },
      { column: "quantityOrdered", header: "Quantity" },
      { column: "priceEach", header: "Price Each" },
    ];
    return { orderDetailFields };
  },

  created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.order,
      () => {
        if (this.order) {
          if (this.order.status === ORDER_STATUS.SHIPPED) {
            this.options = [
              { key: ORDER_STATUS.SHIPPED, text: ORDER_STATUS.SHIPPED },
              { key: ORDER_STATUS.CANCELLED, text: ORDER_STATUS.CANCELLED },
              { key: ORDER_STATUS.DISPUTED, text: ORDER_STATUS.DISPUTED },
            ];
          }
          if (this.order.status === ORDER_STATUS.IN_PROCESS) {
            this.options = [
              { key: ORDER_STATUS.IN_PROCESS, text: ORDER_STATUS.IN_PROCESS },
              { key: ORDER_STATUS.SHIPPED, text: ORDER_STATUS.SHIPPED },
              { Key: ORDER_STATUS.CANCELLED, text: ORDER_STATUS.CANCELLED },
              { Key: ORDER_STATUS.ON_HOLD, text: ORDER_STATUS.ON_HOLD },
            ];
          }
          if (this.order.status === ORDER_STATUS.ON_HOLD) {
            this.options = [
              { key: ORDER_STATUS.ON_HOLD, text: ORDER_STATUS.ON_HOLD },
              { key: ORDER_STATUS.IN_PROCESS, text: ORDER_STATUS.IN_PROCESS },
              { Key: ORDER_STATUS.CANCELLED, text: ORDER_STATUS.CANCELLED },
            ];
          }
          if (this.order.status == ORDER_STATUS.CANCELLED) {
            this.options = [
              { Key: ORDER_STATUS.CANCELLED, text: ORDER_STATUS.CANCELLED },
            ];
          }
          if (this.order.status == ORDER_STATUS.DISPUTED) {
            this.options = [
              { key: ORDER_STATUS.DISPUTED, text: ORDER_STATUS.DISPUTED },
              { key: ORDER_STATUS.RESOLVED, text: ORDER_STATUS.RESOLVED },
            ];
          }
          if (this.order.status == ORDER_STATUS.RESOLVED) {
            this.options = [
              { Key: ORDER_STATUS.RESOLVED, text: ORDER_STATUS.RESOLVED },
              { Key: ORDER_STATUS.DISPUTED, text: ORDER_STATUS.DISPUTED },
            ];
          }
          this.form.orderNumber = this.order.orderNumber;
          this.form.orderDate = this.order.orderDate;
          this.form.requiredDate = this.order.requiredDate;
          this.form.shippedDate = this.order.shippedDate;
          this.form.status = this.order.status;
          this.form.comments = this.order.comments;
          this.form.customerNumber = this.order.customerNumber;
          this.form.customerName = this.order.customerName;
          // console.log("name=" + this.order.customerName);
        }
        if (this.order["orderNumber"])
          this.retrieveOrderDetail(this.order["orderNumber"]);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },

  methods: {
    setStatus(option) {
      this.form.status = option.key;
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
    onsubmit(e) {
      this.errors = [];
      if (!this.form.orderDate) {
        this.errors.push("Order Date required.");
      }
      if (!this.form.customerNumber) {
        this.errors.push("Customer Number required.");
      }
      if (!this.form.status) {
        this.errors.push("Status required.");
      }
      if (!this.form.requiredDate) {
        this.errors.push("Required Date required.");
      }

      if (this.errors.length) {
        return;
      }

      e.preventDefault();
      console.log("this form status = " + this.form.status);
      this.$emit("onsubmit", this.form);
    },
  },
};
</script>
