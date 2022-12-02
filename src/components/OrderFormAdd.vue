<template>
  <form @submit.prevent class="w-full">
    <BaseErrors :errors="errors" />

    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseLabel id="orderNumber" label="Order Number" :info="orderNumber" />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseDropdown
          :options="customerList"
          label="Customer Name"
          @selected="setCustomerNumber"
        />
      </div>

      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseLabel id="status" label="Status" :info="form.status" />
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
          v-model="form.requiredDate"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput
          type="date"
          id="shippedDate"
          label="Shipped Date"
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
        <BaseEditableTable
          ref="childRef"
          :editMode="true"
          :dataList="[]"
          :fields="orderDetailFields"
          :filterEnable="false"
          :viewEnable="false"
          :editEnable="false"
          :addRow="true"
        />
        <BaseButton @click="onsubmit" label="Submit" />
      </div>
    </div>
  </form>
</template>

<script>
import BaseErrors from "../layouts/BaseErrors.vue";
import BaseTextArea from "../layouts/BaseTextArea.vue";
import BaseButton from "../layouts/BaseButton.vue";
import BaseLabel from "../layouts/BaseLabel.vue";
import BaseDropdown from "../layouts/BaseDropdown.vue";
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
    BaseLabel,
    BaseEditableTable,
    BaseInput,
  },
  emits: ["onSubmit"],
  props: {
    order: {
      type: Object,
      default: null,
    },
    orderNumber: null,
  },

  data() {
    return {
      customerList: [],
      form: {
        customerName: "",
        customerNumber: null,
        orderNumber: null,
        orderDate: null,
        requiredDate: null,
        shippedDate: null,
        status: ORDER_STATUS.IN_PROCESS,
        comments: "",
        orderDetailList: null,
      },
      errors: [],
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

    const options = [
      { key: ORDER_STATUS.IN_PROCESS, text: ORDER_STATUS.IN_PROCESS },
      { key: ORDER_STATUS.CANCELLED, text: ORDER_STATUS.CANCELLED },
      { key: ORDER_STATUS.SHIPPED, text: ORDER_STATUS.SHIPPED },
      { Key: ORDER_STATUS.ON_HOLD, text: ORDER_STATUS.ON_HOLD },
      { key: ORDER_STATUS.DISPUTED, text: ORDER_STATUS.DISPUTED },
      { key: ORDER_STATUS.RESOLVED, text: ORDER_STATUS.RESOLVED },
    ];
    const childRef = ref(null);
    const getTableItems = () => {
      return childRef.value?.tableItems;
    };

    return { options, orderDetailFields, getTableItems, childRef };
  },

  mounted() {
    this.retrieveCustomerList();
  },

  methods: {
    setStatus(option) {
      this.form.status = option.key;
    },

    setCustomerNumber(option) {
      this.form.customerNumber = option.key;
    },

    retrieveCustomerList() {
      this.customerList = [];
      createEndpoint(ENDPOINTS.CUSTOMER)
        .fetchAll()
        .then((res) => {
          for (let record in res.data) {
            var temp = {
              key: res.data[record].customerNumber,
              text: res.data[record].customerName,
            };
            this.customerList.push(temp);
          }
        })
        .catch((err) => console.log(err));
    },

    onsubmit(e) {
      this.errors = [];
      if (!this.form.orderDate) {
        this.errors.push("Order Date required.");
      }
      if (!this.form.customerNumber) {
        this.errors.push("Customer required.");
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
