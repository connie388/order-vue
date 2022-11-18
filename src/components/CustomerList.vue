<template>
  <div class="flex flex-row">
    <div class="w-1/4">
      <BaseInput
        id="customerNameLike"
        label="Customer Name"
        labelClass="my-2 font-bold block text-sm text-start"
        v-model="searchCustomerName"
      />
      <BaseButton @click="retrieveCustomersByName" label="Search" />
      <BaseHeader
        label="Customer List"
        class="mt-10 font-bold block text-sm text-start"
      />
      <BaseList
        :resetIndex="reset"
        :options="customers"
        @onclick="setActiveCustomer"
      />
      <BaseButton @click="setNewRecord" label="Add" />
    </div>
    <div class="w-3/4">
      <div>
        <p>{{ msg }}</p>
      </div>
      <div v-if="newRecord">
        <BaseHeader label="New Customer" />
        <CustomerForm @onsubmit="addCustomerData" />
      </div>
      <div v-else-if="currentCustomerCode" class="flex flex-row">
        <div class="w-11/12">
          <BaseHeader label="Update Customer" />
          <CustomerForm
            :edit="true"
            :customerNumber="currentCustomerCode"
            @onsubmit="updateCustomerData"
          />
        </div>
        <div class="w-1/12">
          <i
            class="fa-solid fa-trash-can text-xs text-blue-500 hover:text-blue-700 sm:text-3xl md:text-6xl"
            @click="deleteCustomer"
          ></i>
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
import CustomerForm from "./CustomerForm";
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";
export default {
  components: {
    BaseHeader,
    BaseButton,
    BaseList,
    BaseInput,
    CustomerForm,
  },
  data() {
    return {
      searchCustomerName: "",
      customers: [],
      currentCustomerCode: null,
      newRecord: false,
      reset: false,
      msg: "Please click on a Customer to view, update or delete",
    };
  },

  methods: {
    setActiveCustomer(option) {
      this.currentCustomerCode = option.key;
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

    setNewRecord() {
      this.newRecord = true;
      this.msg = "";
      this.currentCustomerCode = null;
      this.currentIndex = -1;
    },

    deleteCustomer() {
      createEndpoint(ENDPOINTS.CUSTOMER)
        .delete(this.currentCustomerCode)
        .then((res) => {
          console.log(res.data);
          this.msg = "Record deleted successfully!";
          this.currentCustomerCode = null;
          this.retrieveCustomersByName();
        })
        .catch((err) => console.log(err));
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
          this.msg = "Record updated successfully!";
        })
        .catch((err) => console.log(err));
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
          console.log(res.data);
          this.msg = "Record added successfully!";
          this.newRecord = false;
          this.retrieveCustomersByName();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
