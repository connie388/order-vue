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
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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

      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput
          id="orderDate"
          type="date"
          label="Order Date"
          v-model="form.orderDate"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput
          type="date"
          id="requiredDate"
          label="Required Date"
          :disabled="!editable"
          v-model="form.requiredDate"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput
          type="date"
          id="shippedDate"
          label="Shipped Date"
          :disabled="!editable"
          v-model="form.shippedDate"
        />
      </div>

      <div class="w-full px-3">
        <BaseTextArea id="comments" label="Comments" v-model="form.comments" />
      </div>
    </div>

    <hr />
    <div class="w-full">
      <div class="overflow-auto">
        <div v-if="editable">
          <BaseEditableTable
            ref="childRef"
            :editMode="true"
            :fields="orderDetailFields"
            :dataList="orderDetails"
            :filterEnable="false"
            :viewEnable="false"
            :editEnable="false"
            :addRow="true"
          />
          <BaseButton @click="onsubmit" label="Submit" />
        </div>
        <div v-else>
          <BaseViewTable
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
  </form>

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
import BaseErrors from "../layouts/BaseErrors.vue";
import BaseModal from "../layouts/BaseModal.vue";
import BaseTextArea from "../layouts/BaseTextArea.vue";
import BaseButton from "../layouts/BaseButton.vue";
import BaseDropdown from "../layouts/BaseDropdown.vue";
import BaseViewTable from "../layouts/BaseViewTable.vue";
import BaseEditableTable from "../layouts/BaseEditableTable.vue";
import BaseInput from "../layouts/BaseInput.vue";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";
import { ORDER_STATUS } from "@/components/OrderStatus";
import { ref } from "vue";

export default {
  components: {
    BaseErrors,
    BaseTextArea,
    BaseButton,
    BaseDropdown,
    BaseViewTable,
    BaseEditableTable,
    BaseInput,
    BaseModal,
  },
  emits: ["onSubmit"],
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
        orderDetailList: null,
      },
      errors: [],
      options: null,
      orderDetails: [],
      selectedOrderDetail: null,
      visibleMsgView: false,
      visibleOrderDetailEdit: false,
      msg: "",
    };
  },

  setup: () => {
    const orderDetailFields = [
      { column: "productCode", header: "Product Code", type: "text" },
      { column: "quantityOrdered", header: "Quantity", type: "number" },
      { column: "priceEach", header: "Price Each", type: "number" },
      {
        column: "orderLineNumber",
        header: "Order Line Number",
        type: "number",
      },
    ];

    const childRef = ref(null);
    const getTableItems = () => {
      return childRef.value?.tableItems;
    };

    return { orderDetailFields, getTableItems, childRef };
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
              { key: ORDER_STATUS.CANCELLED, text: ORDER_STATUS.CANCELLED },
              { key: ORDER_STATUS.ON_HOLD, text: ORDER_STATUS.ON_HOLD },
            ];
          }
          if (this.order.status === ORDER_STATUS.ON_HOLD) {
            this.options = [
              { key: ORDER_STATUS.ON_HOLD, text: ORDER_STATUS.ON_HOLD },
              { key: ORDER_STATUS.IN_PROCESS, text: ORDER_STATUS.IN_PROCESS },
              { key: ORDER_STATUS.CANCELLED, text: ORDER_STATUS.CANCELLED },
            ];
          }
          if (this.order.status == ORDER_STATUS.CANCELLED) {
            this.options = [
              { key: ORDER_STATUS.CANCELLED, text: ORDER_STATUS.CANCELLED },
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
              { key: ORDER_STATUS.RESOLVED, text: ORDER_STATUS.RESOLVED },
              { key: ORDER_STATUS.DISPUTED, text: ORDER_STATUS.DISPUTED },
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
      createEndpoint(ENDPOINTS.ORDER)
        .fetchById(orderNumber)
        .then((res) => {
          this.orderDetails = res.data?.orderDetailList;
        })
        .catch((err) => console.log(err));
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

      this.form.orderDetailList = this.getTableItems();
      e.preventDefault();
      this.$emit("onSubmit", this.form);
    },
  },
};
</script>
