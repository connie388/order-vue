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
      id="orderNumber"
      label="order Number"
      v-model="form.orderNumber"
    />

    <BaseInput
      id="orderDate"
      type="date"
      label="Order Date"
      v-model="form.orderDate"
    />

    <BaseInput
      id="requiredDate"
      type="date"
      label="Required Date"
      v-model="form.requiredDate"
    />
    <BaseInput
      id="shippedDate"
      type="date"
      label="Shipped Date"
      v-model="form.requiredDate"
    />

     <BaseDropdown
      id="status"
      label="Status"
      :options="statusList" 
      @selected="setFormStatus"
    />

    <BaseTextArea
      id="comments"
      label="Comments"
      v-model="form.comments"
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
  
  props: ["orderNumber", "edit"],
  data() {

    return {
      form: {
        customerNumber: null,
        orderNumber: null,
        orderDate: null,
        requiredDate: null,
        shippedDate: null,
        status: "",
        comments: "",
      },
      errors: [],
    };
  },

setup() {
 const statusList= [{ key: "In Process", text: "In Process" },
      { key: "Shipped", text: "Shipped" },
      { key: "Resolved", text: "Resolved" },
      { key: "Cancelled", text: "Cancelled" },
      { key: "On Hold", text: "On Hold" },
      { key: "Disputed", text: "Disputed" }]
  return {statusList}
},

created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.orderNumber,
      () => {
        if (this.orderNumber)
          this.getOrder();
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
       if (!this.form.orderNumber) {
        this.errors.push('Order Number required.');
      }
       if (!this.form.orderDate) {
        this.errors.push('Order Date required.');
      } if (!this.form.requiredDate) {
        this.errors.push('Required Date required.');
      } if (!this.form.status) {
        this.errors.push('Status required.');
      } 
      if (this.errors.length) {
        return;
      }

      e.preventDefault();   
      this.$emit("onsubmit", this.form);
    },
    setFormStatus(option) {
      this.form.status = option;
    },
    getOrder() {
      createEndpoint(ENDPOINTS.ORDER)
        .fetchById(this.orderNumber)
        .then((res) => {
          this.form.customerNumber = res.data.customerNumber;
          this.form.orderNumber = res.data.orderNumber;
          this.form.orderDate = res.data.orderDate;
          this.form.requiredDate = res.data.requiredDate;
          this.form.shippedDate = res.data.shippedDate;
          this.form.status = res.data.status;
          this.form.comments = res.data.comments;        
        })            
        .catch((err) => console.log(err));
    },
  },
};
</script>
