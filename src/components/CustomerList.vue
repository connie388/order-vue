<template>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <BaseInput
        id="customerNameLike"
        v-model="searchCustomerName"
        placeholder="Customer Name Like"
      />
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <BaseButton @click="retrieveCustomersByName" label="Search Customers" />
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <BaseButton
        className="btn-green"
        @click="this.visibleCustomerAdd = true"
        label="+Add Customer"
      />
    </div>
  </div>
  <div class="overflow-auto">
    <BaseViewTable
      :fields="customerFields"
      :dataList="customers"
      :viewEnable="false"
      @editItem="editCustomer"
      @deleteItem="deleteCustomer"
    />
  </div>

  <BaseModal
    :showing="visibleCustomerAdd"
    @close="this.visibleCustomerAdd = false"
  >
    <template v-slot:header
      ><h1 class="text-xl font-bold text-center">New Customer</h1></template
    >

    <template v-slot:body>
      <CustomerFormEdit
        @onsubmit="addCustomerData"
        @onClose="this.visibleCustomerAdd = false"
      />
    </template>
  </BaseModal>

  <BaseModal
    :showing="visibleCustomerView"
    @close="this.visibleCustomerView = false"
  >
    <template v-slot:header
      ><h1 class="text-xl font-bold text-center">
        Customer Information
      </h1></template
    >

    <template v-slot:body>
      <CustomerFormEdit
        :customer="selectedCustomer"
        @onsubmit="updateCustomerData"
        @onClose="this.visibleCustomerView = false"
      />
    </template>
  </BaseModal>

  <NotificationModal
    :show="visibleMsgView"
    :msg="msg"
    @close="this.visibleMsgView = false"
  />
</template>

<script>
import BaseButton from "../layouts/BaseButton.vue";
import BaseInput from "../layouts/BaseInput.vue";
import BaseModal from "../layouts/BaseModal.vue";
import NotificationModal from "./NotificationModal.vue";
import BaseViewTable from "../layouts/BaseViewTable.vue";
import CustomerFormEdit from "./CustomerFormEdit.vue";

import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";
export default {
  components: {
    BaseButton,
    BaseInput,
    BaseViewTable,
    BaseModal,
    NotificationModal,
    CustomerFormEdit,
  },
  data() {
    return {
      visibleCustomerView: false,
      visibleCustomerAdd: false,
      visibleMsgView: false,
      selectedCustomer: null,
      searchCustomerName: "",
      customers: [],
      msg: "Please click on a Customer to view, update or delete",
    };
  },

  setup() {
    const customerFields = [
      { column: "customerNumber", header: "Customer Number", type: "number" },
      { column: "customerName", header: "Customer Name", type: "text" },
      {
        column: "contactFirstName",
        header: "Contact First Name",
        type: "text",
      },
      { column: "contactLastName", header: "Contact Last Name", type: "text" },
      { column: "phone", header: "Phone", type: "text" },
      { column: "creditLimit", header: "Credit Limit", type: "number" },
    ];
    return {
      customerFields,
    };
  },
  methods: {
    editCustomer(item) {
      this.selectedCustomer = item;
      this.visibleCustomerView = true;
    },

    retrieveCustomersByName() {
      this.customers = [];
      createEndpoint(ENDPOINTS.CUSTOMER)
        .fetchByName(this.searchCustomerName)
        .then((res) => {
          this.customers = res.data;
          if (res.data.length === 0) {
            this.msg = "No customers found.";
            this.visibleMsgView = true;
          }
        })
        .catch((err) => {
          console.log(err);
          this.msg = "Something wrong happened";
          this.visibleMsgView = true;
        });
    },

    deleteCustomer(item) {
      createEndpoint(ENDPOINTS.CUSTOMER)
        .delete(item.customerNumber)
        .then((res) => {
          console.log(res.data);
          this.msg = "Customer is deleted successfully!";
          this.customers = this.customers.filter(function (obj) {
            return obj.customerNumber !== item.customerNumber;
          });
        })
        .catch((err) => {
          console.log(err);
          this.msg = "Something wrong happened";
        });
      this.visibleMsgView = true;
    },

    updateCustomerData(form) {
      var data = {
        customerNumber: form.customerNumber,
        customerName: form.customerName,
        contactLastName: form.contactLastName,
        contactFirstName: form.contactFirstName,
        phone: form.phone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        country: form.country,
        postalCode: form.postalCode,
        salesRepEmployeeNumber: form.salesRepEmployeeNumber,
        creditLimit: form.creditLimit,
      };
      createEndpoint(ENDPOINTS.CUSTOMER)
        .update(form.customerNumber, data)
        .then((res) => {
          console.log(res.data);
          this.msg = "Customer is updated successfully!";
          this.retrieveCustomersByName();
        })
        .catch((err) => {
          console.log(err);
          this.msg = "Something wrong happened";
        });
      this.visibleMsgView = true;
    },

    addCustomerData(form) {
      var data = {
        customerNumber: form.customerNumber,
        customerName: form.customerName,
        contactLastName: form.contactLastName,
        contactFirstName: form.contactFirstName,
        phone: form.phone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        country: form.country,
        postalCode: form.postalCode,
        salesRepEmployeeNumber: form.salesRepEmployeeNumber,
        creditLimit: form.creditLimit,
      };

      createEndpoint(ENDPOINTS.CUSTOMER)
        .create(data)
        .then((res) => {
          console.log(res.data.customerNumber);
          this.msg = "Customer is added successfully!";
          this.retrieveCustomersByName();
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
