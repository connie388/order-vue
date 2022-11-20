<template>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
      <BaseInput
        id="customerNameLike"
        v-model="searchCustomerName"
        label="Customer Name like"
        placeholder="Customer Name Like"
      />
    </div>
    <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
      <BaseInput
        type="date"
        label="From Order Date"
        v-model="searchOrderFromDate"
      />
    </div>
    <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
      <BaseInput
        type="date"
        label="To Order Date"
        v-model="searchOrderToDate"
      />
    </div>

    <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
      <br />
      <BaseButton
        @click="retrieveOrdersByNameAndDateRange"
        label="Search Orders"
      />
    </div>
    <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
      <br />
      <BaseButton @click="this.visibleOrderAdd = true" label="+Add Order" />
    </div>
  </div>

  <div class="overflow-auto">
    <BaseTable
      :fields="orderCustomerFields"
      :dataList="orders"
      @viewItem="viewOrder"
      @editItem="editOrder"
      :deleteEnable="false"
      :filterEnable="true"
    />
  </div>

  <BaseModal :showing="visibleOrderEdit" @close="this.visibleOrderEdit = false">
    <template v-slot:header
      ><h1 class="text-xl font-bold text-center">
        Order Information
      </h1></template
    >

    <template v-slot:body>
      <OrderFormEdit :order="selectedOrder" @onsubmit="updateOrderData" />
    </template>

    <!-- <template v-slot:footer> <BaseButton label="Add" /></template> -->
  </BaseModal>
  <BaseModal :showing="visibleOrderView" @close="this.visibleOrderView = false">
    <template v-slot:header
      ><h1 class="text-xl font-bold text-center">
        Order Information
      </h1></template
    >

    <template v-slot:body>
      <OrderFormView :order="selectedOrder" />
    </template>

    <!-- <template v-slot:footer> <BaseButton label="Add" /></template> -->
  </BaseModal>
  <BaseModal
    :showing="visibleMsgView"
    modalContainerClass="modal-notify-container"
    modalContentClass="modal-notify-content"
    @close="this.visibleMsgView = false"
  >
    <template v-slot:body>
      <p>{{ this.msg }}</p>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from "../layouts/BaseButton.vue";
import BaseInput from "../layouts/BaseInput.vue";
import BaseTable from "../layouts/BaseTable.vue";
import BaseModal from "../layouts/BaseModal";
import OrderFormView from "./OrderFormView";
import OrderFormEdit from "./OrderFormEdit";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTable,
    BaseModal,
    OrderFormView,
    OrderFormEdit,
  },
  data() {
    return {
      searchCustomerName: "",
      searchOrderFromDate: null,
      searchOrderToDate: null,
      orders: [],
      visibleOrderView: false,
      visibleOrderEdit: false,
      visibleMsgView: false,
      selectedOrder: null,
      msg: "Please click on a Order to view, update or delete",
    };
  },

  setup() {
    const orderCustomerFields = [
      { column: "customerNumber", header: "Customer Number" },
      { column: "customerName", header: "Customer Name" },
      { column: "orderNumber", header: "Order Number" },
      { column: "orderDate", header: "Order Date" },
      { column: "requiredDate", header: "Required Date" },
      { column: "shippedDate", header: "Shipped Date" },
      { column: "status", header: "Status" },
    ];
    return {
      orderCustomerFields,
    };
  },

  methods: {
    editOrder(item) {
      this.selectedOrder = item;
      this.visibleOrderEdit = true;
    },
    viewOrder(item) {
      this.selectedOrder = item;
      this.visibleOrderView = true;
    },
    retrieveOrdersByNameAndDateRange() {
      this.orders = [];
      createEndpoint(ENDPOINTS.ORDER_CUSTOMER)
        .fetchByNameAndDateRange(
          this.searchCustomerName,
          this.searchOrderFromDate,
          this.searchOrderToDate
        )
        .then((res) => {
          for (let record in res.data) {
            var tempOrder = {
              customerNumber: res.data[record].customerNumber,
              customerName: res.data[record].customerName,
              orderNumber: res.data[record].orderNumber,
              orderDate: res.data[record].orderDate?.substring(0, 10),
              requiredDate: res.data[record].requiredDate?.substring(0, 10),
              shippedDate: res.data[record].shippedDate?.substring(0, 10),
              status: res.data[record].status,
              comments: res.data[record].comments,
              createdAt: res.data[record].createdAt,
              updatedAt: res.data[record].updatedAt,
              // customerNumber: res.data[record].customerNumber,
            };
            this.orders.push(tempOrder);
            // console.log(tempOrder);
          }
        })
        .catch((err) => console.log(err));
    },
    updateOrderData(form) {
      var data = {
        orderNumber: form.orderNumber,
        customerNumber: form.customerNumber,
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
          this.msg = "Order is updated successfully!";
          this.retrieveOrdersByNameAndDateRange();
        })
        .catch((err) => {
          console.log(err);
          this.msg = "Something wrong happened";
        });
      this.visibleMsgView = true;
    },
  },
};
</script>
