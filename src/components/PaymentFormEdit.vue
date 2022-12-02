<template>
  <form @submit.prevent class="w-full max-w-lg">
    <BaseErrors :errors="errors" />
    <div v-if="edit">
      <BaseLabel label="Customer Name" :info="customerName" />
      <BaseLabel label="Check Number" :info="form.checkNumber" />
    </div>
    <div v-else>
      <BaseDropdown
        :options="customerList"
        label="Customer Name"
        @selected="setCustomerNumber"
      />

      <BaseInput
        id="checkNumber"
        label="Check Number"
        v-model="form.checkNumber"
      />
    </div>
    <BaseInput
      type="date"
      id="paymentDate"
      label="Payment Date"
      v-model="form.paymentDate"
    />

    <BaseInput id="amount" type="number" label="Amount" v-model="form.amount" />

    <BaseButton @click="onsubmit" label="Submit" class="mr-2" />
    <BaseButton @click="onclose" label="Close" />
  </form>
</template>
<script>
import BaseInput from "../layouts/BaseInput.vue";
import BaseLabel from "../layouts/BaseLabel.vue";
import BaseButton from "../layouts/BaseButton.vue";
import BaseErrors from "../layouts/BaseErrors.vue";
import BaseDropdown from "../layouts/BaseDropdown.vue";

export default {
  emits: ["onSubmit", "onClose"],
  components: {
    BaseInput,
    BaseButton,
    BaseErrors,
    BaseDropdown,
    BaseLabel,
  },
  props: {
    customerName: {
      type: String,
    },
    payment: {
      type: Object,
      default: null,
    },
    edit: {
      type: Boolean,
    },
    customerList: {
      type: Array,
    },
  },

  data() {
    return {
      form: {
        customerNumber: null,
        checkNumber: "",
        paymentDate: null,
        amount: null,
      },
      errors: [],
    };
  },

  created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.payment,
      () => {
        if (this.payment) {
          this.form.customerNumber = this.payment.customerNumber;
          this.form.checkNumber = this.payment.checkNumber;
          this.form.paymentDate = this.payment.paymentDate;
          this.form.amount = this.payment.amount;
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },

  methods: {
    onclose() {
      this.$emit("onClose");
    },
    setCustomerNumber(option) {
      this.form.customerNumber = option.key;
    },

    onsubmit(e) {
      this.errors = [];
      if (!this.form.customerNumber) {
        this.errors.push("Customer  required.");
      }
      if (!this.form.checkNumber) {
        this.errors.push("Check Number required.");
      }
      if (!this.form.paymentDate) {
        this.errors.push("Payment Date required.");
      }
      if (!this.form.amount || this.form.amount <= 0) {
        this.errors.push("Payment Amount required.");
      }

      if (this.errors.length) {
        return;
      }

      e.preventDefault();
      this.$emit("onSubmit", this.form);
    },
  },
};
</script>
