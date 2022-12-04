<template>
  <div>
    <BaseErrors :errors="errors" />
  </div>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
      <BaseDropdown
        :options="customerList"
        label="Customer Name"
        @selected="setCustomerNumber"
      />
    </div>
    <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
      <BaseInput
        type="date"
        label="From Payment Date"
        v-model="searchPaymentFromDate"
      />
    </div>
    <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
      <BaseInput
        type="date"
        label="To Payment Date"
        v-model="searchPaymentToDate"
      />
    </div>

    <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
      <br />
      <BaseButton
        @click="retrievePaymentsByCustomerAndDateRange"
        label="Search Payments"
      />
    </div>
    <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
      <br />
      <BaseButton
        className="btn-green"
        @click="this.visiblePaymentAdd = true"
        label="+Add Payment"
      />
    </div>
  </div>

  <div class="overflow-auto">
    <BaseViewTable
      :fields="paymentFields"
      :editMode="false"
      :dataList="payments"
      @editItem="editPayment"
      @deleteItem="deletePayment"
      :viewEnable="false"
      :filterEnable="true"
    />
  </div>

  <BaseModal
    :showing="visiblePaymentAdd"
    @close="this.visiblePaymentAdd = false"
  >
    <template v-slot:header
      ><h1 class="text-xl font-bold text-center">
        Add Payment Information
      </h1></template
    >

    <template v-slot:body>
      <PaymentFormEdit
        :edit="false"
        :customerList="customerList"
        @onClose="this.visiblePaymentAdd = false"
        @onSubmit="addPayment"
      />
    </template>

    <!-- <template v-slot:footer> <BaseButton label="Add" /></template> -->
  </BaseModal>
  <BaseModal
    :showing="visiblePaymentEdit"
    @close="this.visiblePaymentEdit = false"
  >
    <template v-slot:header
      ><h1 class="text-xl font-bold text-center">
        Payment Information
      </h1></template
    >

    <template v-slot:body>
      <PaymentFormEdit
        :payment="selectedPayment"
        :customerName="searchCustomerName"
        :edit="true"
        @onClose="this.visiblePaymentEdit = false"
        @onSubmit="updatePayment"
      />
    </template>

    <!-- <template v-slot:footer> <BaseButton label="Add" /></template> -->
  </BaseModal>

  <NotificationModal
    :show="visibleMsgView"
    :msg="msg"
    @close="this.visibleMsgView = false"
  />
</template>

<script>
import BaseErrors from "../layouts/BaseErrors.vue";
import BaseButton from "../layouts/BaseButton.vue";
import BaseInput from "../layouts/BaseInput.vue";
import BaseDropdown from "../layouts/BaseDropdown.vue";
import BaseViewTable from "../layouts/BaseViewTable.vue";
import BaseModal from "../layouts/BaseModal";
import NotificationModal from "./NotificationModal.vue";
import PaymentFormEdit from "./PaymentFormEdit";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseViewTable,
    BaseDropdown,
    BaseErrors,
    BaseModal,
    NotificationModal,
    PaymentFormEdit,
  },
  data() {
    return {
      customerList: [],
      searchCustomerNumber: null,
      searchCustomerName: "",
      searchPaymentFromDate: null,
      searchPaymentToDate: null,
      payments: [],

      visiblePaymentEdit: false,
      visiblePaymentAdd: false,
      visibleMsgView: false,
      errors: [],
      msg: "",
    };
  },

  setup() {
    const paymentFields = [
      { column: "checkNumber", header: "Check Number", type: "text" },
      { column: "paymentDate", header: "Payment Date", type: "text" },
      { column: "amount", header: "Amount", type: "number" },
    ];

    return {
      paymentFields,
    };
  },

  mounted() {
    this.retrieveCustomerList();
  },

  methods: {
    setCustomerNumber(option) {
      this.searchCustomerNumber = option.key;
      this.searchCustomerName = option.text;
    },

    editPayment(item) {
      this.selectedPayment = {
        ...item,
        customerNumber: this.searchCustomerNumber,
      };
      this.visiblePaymentEdit = true;
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

    retrievePaymentsByCustomerAndDateRange() {
      this.errors = [];
      if (!this.searchCustomerNumber) {
        this.errors.push("Please select a customer.");
      }
      this.payments = [];
      createEndpoint(ENDPOINTS.PAYMENT)
        .fetchByCustomerAndDateRange(
          this.searchCustomerNumber,
          this.searchPaymentFromDate,
          this.searchPaymentToDate,
          null
        )
        .then((res) => {
          for (let record in res.data) {
            var tempPayment = {
              customerNumber: res.data[record].customerNumber,
              checkNumber: res.data[record].checkNumber,
              paymentDate: res.data[record].paymentDate?.substring(0, 10),
              amount: res.data[record].amount,
            };
            this.payments.push(tempPayment);
          }
        })
        .catch((err) => console.log(err));
    },
    updatePayment(form) {
      var data = {
        checkNumber: form.checkNumber,
        customerNumber: form.customerNumber,
        paymentDate: form.paymentDate,
        amount: form.amount,
      };
      console.log("data=" + data);

      createEndpoint(ENDPOINTS.PAYMENT)
        .update(data.customerNumber, data.checkNumber, data)
        .then((res) => {
          console.log(res.data);
          this.msg = "Payment is updated successfully!";
          this.retrievePaymentsByCustomerAndDateRange();
        })
        .catch((err) => {
          console.log(err);
          this.msg = "Something wrong happened";
        });
      this.visibleMsgView = true;
    },

    addPayment(form) {
      var data = {
        checkNumber: form.checkNumber,
        customerNumber: form.customerNumber,
        paymentDate: form.paymentDate,
        amount: form.amount,
      };
      console.log(data);
      createEndpoint(ENDPOINTS.PAYMENT)
        .create(data)
        .then((res) => {
          console.log(res.data);
          this.checkNumber = res.data.checkNumber;
          this.msg = "Payment is added successfully!";
          this.retrievePaymentsByCustomerAndDateRange();
        })
        .catch((err) => {
          console.log(err);
          this.msg = "Something wrong happened";
        });
      this.visibleMsgView = true;
    },
    deletePayment(item) {
      createEndpoint(ENDPOINTS.PAYMENT)
        .delete(item.customerNumber, item.checkNumber)
        .then((res) => {
          console.log(res.data);
          this.msg = "Payment is deleted successfully!";
          this.retrievePaymentsByCustomerAndDateRange();
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
