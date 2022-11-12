<template>
  <select  class="dropdown" v-model="selectedOption" @change="onchange">
    <option  value="">Please Select One</option>
    <option v-for="option in options" :key="option" :value="option">{{option}}</option>
  </select>
</template>

<script>
export default {
  props : ['options'] ,
  data(){
    return {
      selectedOption : '' 
    }
  },
  methods : {
    onchange() {
      if(this.selectedOption) this.$emit('selected' , this.selectedOption); 
    }   
  }
}
</script>