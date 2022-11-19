<template>
  <form @submit.prevent class="w-full max-w-lg">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul class="text-red-500">
        <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <div class="flex flex-wrap -mx-3 mb-6">
      <BaseInput type="hidden" id="customerNumber" v-model="form.customerNumber"/>
      <div class="w-full px-3">
        <BaseInput id="customerName" label="Customer Name" v-model="form.customerName"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <BaseInput id="contactLastName" label="Contact Last Name" v-model="form.contactLastName"/>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <BaseInput id="contactFirstName" label="Contact First Name" v-model="form.contactFirstName"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <BaseInput id="phone" label="Phone" v-model="form.phone"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <BaseTextArea id="addressLine1" label="Address" v-model="form.addressLine1"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <BaseTextArea id="addressLine2" label="Address" v-model="form.addressLine2"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput id="city" label="City" v-model="form.city"/>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput id="state" label="State" v-model="form.state"/>
      </div>

      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput id="country" label="Country" v-model="form.country"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput id="postalCode" label="Postal Code" v-model="form.postalCode"/>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput id="salesRepEmployeeNumber" label="Sales Rep." v-model="form.salesRepEmployeeNumber"/> 
      </div>

      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <BaseInput id="creditLimit" label="Credit Limit" v-model="form.creditLimit"/>
      </div>
    </div>
    <BaseButton @click="onsubmit" label="Submit" />
  </form>
</template>
<script>
import BaseInput from "../layouts/BaseInput.vue";
import BaseButton from "../layouts/BaseButton.vue";
import BaseTextArea from "../layouts/BaseTextArea.vue";

export default {
  emits: ["onsubmit"],
  components: {
    BaseInput,
    BaseButton,
    BaseTextArea,
  },
   props: {
    customer: {
      type: Object,
      default: null,
    },
    edit: {
      type: String, 
    }
   },


  data() {
    return {

      form: {
        customerNumber: null,
        customerName: "",
        contactLastName: "",
        contactFirstName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        salesRepEmployeeNumber: "",
        creditLimit: null,
      },
      errors: [],
    };
  },

  created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.customer,
      () => {
        if (this.customer) {
            this.form.customerNumber = this.customer.customerNumber;
          this.form.customerName = this.customer.customerName;
          this.form.contactLastName = this.customer.contactLastName;
          this.form.contactFirstName = this.customer.contactFirstName;
          this.form.phone = this.customer.phone;
          this.form.addressLine1 = this.customer.addressLine1;
          this.form.addressLine2 =this.customer.addressLine2;
          this.form.city =this.customer.city;
          this.form.state = this.customer.state;
          this.form.country = this.customer.country;
          this.form.postalCode = this.customer.postalCode;
          this.form.salesRepEmployeeNumber = this.customer.salesRepEmployeeNumber;
          this.form.creditLimit = this.customer.creditLimit;
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },

  methods: {
    onsubmit(e) {
      this.errors = [];
      if (!this.form.customerName) {
        this.errors.push("Customer Name required.");
      }
      if (!this.form.contactLastName) {
        this.errors.push("Contact Last Name required.");
      }
      if (!this.form.contactLastName) {
        this.errors.push("Contact Last Name required.");
      }
      if (!this.form.phone) {
        this.errors.push("Phone required.");
      }
      if (!this.form.addressLine1) {
        this.errors.push("Address required.");
      }
      if (!this.form.city) {
        this.errors.push("City required.");
      }
      if (!this.form.country) {
        this.errors.push("Country required.");
      }
      if (this.form.postalCode?.length > 15) {
        this.errors.push(
          "Postal Code should be less than or equal to 15 characters"
        );
      }

      if (this.errors.length) {
        return;
      }

      e.preventDefault();
      this.$emit("onsubmit", this.form);
    },
  },
};
</script>
