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
      <!-- <BaseList :resetIndex="resetOrderList" :options="orders" @onclick="setActiveOrder" />

      <BaseButton @click="setNewRecord" label="Add"/> -->
    </div>
    <div class="w-3/4">
      <div>
        <p>{{ msg }}</p>
      </div>
      <div class="table-responsive my-5">
        <!-- The table component -->
        <BaseTable :fields="fields" :dataList="orders"></BaseTable>
      </div>
      <!-- <div v-if="newRecord">
        <BaseHeader label="New Order" />
        <OrderForm  @onsubmit="addOrderData"/>
      </div>
      <div v-else-if="currentOrderNumber" class="flex flex-row">
        <div class="w-11/12">
          <BaseHeader label="Update Order" />
          <OrderForm
            :edit=true
            :orderNumber="currentOrderNumber"
            @onsubmit="updateOrderData"
          />
        </div>
        <div class="w-1/12">
          <i
            class="fa-solid fa-trash-can text-xs text-blue-500 hover:text-blue-700 sm:text-3xl md:text-6xl"
            @click="deleteOrder"
          ></i>
        </div>
      </div>   -->
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
      currentOrderNumber: null,
      currentCustomerNumber: null,
      newRecord: false,
      reset: false,
      resetOrderList: false,
      msg: "Please click on a Order to view, update or delete",
    };
  },

  setup() {
    const fields = [
      { column: "orderNumber", header: "Order Number" },
      { column: "orderDate", header: "Order Date" },
      { column: "requiredDate", header: "Required Date" },
      { column: "shippedDate", header: "Shipped Date" },
      { column: "status", header: "Status" },
    ];
    return { fields };
  },

  methods: {
    setActiveCustomer(customerNumber) {
      this.currentCustomerNumber = customerNumber;
      this.msg = "";
      this.newRecord = false;
    },
    setActiveOrder(orderNumber) {
      this.currentOrderNumber = orderNumber;
      this.msg = "";
      this.newRecord = false;
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
      this.resetOrderList = !this.resetOrderList;

      createEndpoint(ENDPOINTS.ORDER)
        .fetchByIdAndDateRange(
          this.currentCustomerNumber,
          this.searchOrderFromDate,
          this.searchOrderToDate
        )
        .then((res) => {
          this.orders = res.data;
        })
        .catch((err) => console.log(err));
    },
    setNewRecord() {
      this.newRecord = true;
      this.msg = "";
      this.currentOrderNumber = null;
      this.currentIndex = -1;
    },

    deleteOrder() {
      createEndpoint(ENDPOINTS.ORDER)
        .delete(this.currentOrderNumber)
        .then((res) => {
          console.log(res.data);
          this.msg = "Record deleted successfully!";
          this.currentOrderNumber = null;
          this.retrieveOrdersByName();
        })
        .catch((err) => console.log(err));
    },

    updateOrderData(form) {
      var data = {
        customerNumber: form.customerNumber,
        orderNumber: form.orderNumber,
        orderDate: form.orderDate,
        requiredDate: form.requiredDate,
        shippedDate: form.shippedDate,
        status: form.status,
        comments: form.comments,
      };
      createEndpoint(ENDPOINTS.ORDER)
        .update(form.orderNumber, data)
        .then((res) => {
          console.log(res.data);
          this.msg = "Record updated successfully!";
        })
        .catch((err) => console.log(err));
    },

    addOrderData(form) {
      var data = {
        customerNumber: form.customerNumber,
        orderNumber: form.orderNumber,
        orderDate: form.orderDate,
        requiredDate: form.requiredDate,
        shippedDate: form.shippedDate,
        status: form.status,
        comments: form.comments,
      };

      createEndpoint(ENDPOINTS.ORDER)
        .create(data)
        .then((res) => {
          console.log(res.data);
          this.msg = "Record added successfully!";
          this.newRecord = false;
          this.retrieveOrdersByName();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
