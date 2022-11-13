<template>
  <form @submit.prevent>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul class="text-red-500">
        <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <BaseInput
      id="customerNumber"
      label="Customer Number"
      :disabled = "edit"
      v-model="form.customerNumber"
    />
 
    <BaseInput
      id="customerName"
      label="Customer Name"
      v-model="form.customerName"
    />

    <BaseInput
      id="contactLastName"
      label="Contact Last Name"
      v-model="form.contactLastName"
    />

    <BaseInput
      id="contactFirstName"
      label="Contact First Name"
      v-model="form.contactFirstName"
    />

    <BaseInput
      id="phone"
      label="Phone"
      v-model="form.phone"
    />

    <BaseTextArea
      id="addressLine1"
      label="Address"
      v-model="form.addressLine1"
    />

    <BaseTextArea
      id="addressLine2"
      label="Address"
      v-model="form.addressLine2"
    />

   <BaseInput
      id="city"
      label="City"
      v-model="form.city"
    />

    <BaseInput
      id="state"
      label="State"
      v-model="form.state"
    />

    <BaseInput
      id="country"
      label="Country"
      v-model="form.country"
    />

    <BaseInput
      id="postalCode"
      label="Postal Code"
      v-model="form.postalCode"
    />

    <BaseInput
      id="salesRepEmployeeNumber"
      label="Sales Represetative"
      v-model="form.salesRepEmployeeNumber"
    />

    <BaseInput
      id="creditLimit"
      label="Credit Limit"
      v-model="form.creditLimit"
    />
    <BaseButton @click="onsubmit" label="Submit"/>
  </form>
</template>
<script>
import { createEndpoint, ENDPOINTS } from "@/services/CreateEndPoint";
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
  props: ["customerNumber", "edit"],
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
        state:"",
        country:"",
        postalCode:"",
        salesRepEmployeeNumber:"",
        creditLimit:null,
      },
      errors: [],
    };
  },

created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.customerNumber,
      () => {
        if (this.customerNumber)
          this.getCustomer();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },

  methods: {
    onsubmit(e) {
      this.errors = [];
       if (!this.form.customerNumber) {
        this.errors.push('Customer Number required.');
      }
       if (!this.form.customerName) {
        this.errors.push('Customer Name required.');
      }
       if (!this.form.contactLastName) {
        this.errors.push('Contact Last Name required.');
      } if (!this.form.contactLastName) {
        this.errors.push('Contact Last Name required.');
      } if (!this.form.phone) {
        this.errors.push('Phone required.');
      } if (!this.form.addressLine1) {
        this.errors.push('Address required.');
      } if (!this.form.city) {
        this.errors.push('City required.');
      } if (!this.form.country) {
        this.errors.push('Country required.');
       } 
      if (this.form.postalCode?.length > 15) {
        this.errors.push('Postal Code should be less than or equal to 15 characters');
      }

      if (this.errors.length) {
        return;
      }

      e.preventDefault();   
      this.$emit("onsubmit", this.form);
    },

    getCustomer() {
      createEndpoint(ENDPOINTS.CUSTOMER)
        .fetchById(this.customerNumber)
        .then((res) => {
          this.form.customerNumber = res.data.customerNumber;
          this.form.customerName = res.data.customerName;
          this.form.contactLastName = res.data.contactLastName;
          this.form.contactFirstName = res.data.contactFirstName;
          this.form.phone = res.data.phone;
          this.form.addressLine1 = res.data.addressLine1;
          this.form.addressLine2 = res.data.addressLine2;
          this.form.city = res.data.city;
          this.form.state = res.data.state;
          this.form.country = res.data.country;
          this.form.postalCode = res.data.postalCode;          
          this.form.salesRepEmployeeNumber = res.data.salesRepEmployeeNumber;          
          this.form.creditLimit = res.data.creditLimit;          
        })            
        .catch((err) => console.log(err));
    },
  },
};
</script>
