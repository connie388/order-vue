<template>
  <div class="flex flex-row">
    <div class="w-1/4">
      <BaseInput
        id="customerNameLike"
        label="Customer Name"
        labelClass="my-2 font-bold block text-4xl text-start"
        v-model="searchCustomerName"
      />
      <BaseButton @click="retrieveCustomersByName" label="Search" />
      <BaseHeader
        label="Customer List"
        class="mt-10 font-bold block text-4xl text-start"
      />
      <BaseList
        :resetIndex="reset"
        :options="customers"
        @onclick="setActiveCustomer"
      />
      <div v-if="this.currentCustomerNumber">
        <BaseInput
          type="date"
          label="From Order Date"
          v-model="searchOrderFromDate"
        />
        <BaseInput
          type="date"
          label="To Order Date"
          v-model="searchOrderToDate"
        />
        <BaseButton @click="retrieveOrdersByIdAndDateRange" label="Search" />
      </div>
    </div>
    <div class="w-3/4">
      <div>
        <p>{{ msg }}</p>
      </div>
      <div v-if="this.currentCustomerNumber">
        <div>
          <BaseHeader :label="'Customer: ' + this.currentCustomerName" />
        </div>
        <div v-if="submitted">
          <!-- The table component -->
          <BaseTable
            @onclick="retrieveOrderDetail"
            :fields="orderFields"
            :dataList="orders"
            :showmsg="true"
            :reset="resetOrders"
          ></BaseTable>

          <BaseTable
            :fields="orderDetailFields"
            :dataList="orderDetails"
            :reset="resetOrders"
          ></BaseTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "../layouts/BaseHeader.vue";
import BaseButton from "../layouts/BaseButton.vue";
import BaseList from "../layouts/BaseList.vue";
import BaseInput from "../layouts/BaseInput.vue";
import BaseTable from "../layouts/BaseTable.vue";

// import OrderForm from "./OrderForm";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";

export default {
  components: {
    BaseHeader,
    BaseButton,
    BaseList,
    BaseInput,
    BaseTable,
    // OrderForm,
  },
  data() {
    return {
      searchCustomerName: "",
      searchOrderFromDate: null,
      searchOrderToDate: null,
      customers: [],
      orders: [],
      orderDetails: [],
      currentOrderNumber: null,
      currentCustomerNumber: null,
      currentCustomerName: "",
      reset: false,
      resetOrders: false,
      submitted: false,
      msg: "Please click on a Order to view, update or delete",
    };
  },

  setup() {
    const orderFields = [
      { column: "orderNumber", header: "Order Number" },
      { column: "orderDate", header: "Order Date" },
      { column: "requiredDate", header: "Required Date" },
      { column: "shippedDate", header: "Shipped Date" },
      { column: "status", header: "Status" },
    ];
    const orderDetailFields = [
      { column: "orderNumber", header: "Order Number" },
      { column: "productCode", header: "Product Code" },
      { column: "quantityOrdered", header: "Quantity" },
      { column: "priceEach", header: "Price Each" },
    ];
    return { orderFields, orderDetailFields };
  },

  methods: {
    setActiveCustomer(option) {
      this.currentCustomerNumber = option.key;
      this.currentCustomerName = option.text;
      this.msg = "";
      this.submitted = false;
      this.orders = [];
      this.orderDetails = [];
    },
    setActiveOrder(option) {
      this.currentOrderNumber = option.key;
      this.msg = "";
    },

    retrieveCustomersByName() {
      this.customers = [];
      this.reset = !this.reset;
      createEndpoint(ENDPOINTS.CUSTOMER)
        .fetchByName(this.searchCustomerName)
        .then((res) => {
          for (let record in res.data) {
            var customer = {
              key: res.data[record].customerNumber,
              text: res.data[record].customerName,
            };
            this.customers.push(customer);
          }
        })
        .catch((err) => console.log(err));
    },

    retrieveOrdersByIdAndDateRange() {
      this.orders = [];
      this.orderDetails = [];
      this.submitted = true;
      this.resetOrders = !this.resetOrders;
      createEndpoint(ENDPOINTS.ORDER)
        .fetchByIdAndDateRange(
          this.currentCustomerNumber,
          this.searchOrderFromDate,
          this.searchOrderToDate
        )
        .then((res) => {
          for (let record in res.data) {
            var tempOrder = {
              orderNumber: res.data[record].orderNumber,
              orderDate: res.data[record].orderDate.substring(0, 10),
              requiredDate: res.data[record].requiredDate.substring(0, 10),
              shippedDate: res.data[record].shippedDate.substring(0, 10),
              status: res.data[record].status,
              comments: res.data[record].comments,
              // customerNumber: res.data[record].customerNumber,
            };
            this.orders.push(tempOrder);
          }
        })
        .catch((err) => console.log(err));
    },

    retrieveOrderDetail(item) {
      this.orderDetails = [];
      createEndpoint(ENDPOINTS.ORDER_DETAIL)
        .fetchById(item.orderNumber)
        .then((res) => {
          this.orderDetails = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
