<template>
  <label v-if="label" :for="id" class="font-bold block my-2">
    {{ label }}
  </label>
  <select  class="className" v-model="selectedOption" @change="onchange" >
    <option  value="">Please Select One</option>
    <option v-for="option in options" :key="option" :value="option">{{option}}</option>
  </select>
</template>

<script>
export default {
  emits: ['selected'],
  props: {
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
    className: {
      type: String,
      default: "dropdown",
    },
  },
  data(){
    return {
      selectedOption : '' 
    }
  },
  methods : {
    onchange() {
      if(this.selectedOption) this.$emit('selected' , this.selectedOption); 
    },
  }
}
</script>