<template>
    <div v-if="dataList.length === 0">No data available.</div>

    <div v-else>
        <input v-model="searchString" placeholder="search" class="mb-1">
 
<table id="tableComponent" class="shadow-lg bg-white border-collapse">
  <thead>
    <tr>
      <!-- loop through each value of the fields to get the table header -->
      <th class="bg-blue-100 border text-left" v-for="field in fields" :key='field.column' @click="setSortColumn(field.column)" > 
        {{field.header}} <i class="fa-solid fa-sort"></i>
       </th>
    </tr>
  </thead>
  <tbody>
      <tr v-for="item in filteredList" :key='item'>
      <td class="border" v-for="field in fields" :key='field.column'>{{item[field.column]}}</td>
    </tr>
  </tbody>
</table> 
 </div>
</template>
<script>
export default {
  name: 'TableComponent',
  props:{
      // 
      dataList:{
          type: Array,
      },
      fields:{
          type: Array,
      }
  }, 
  data() {
    return {
        sortColumn: "",
        order: "ASC",
        searchString: "",
    }
    },
    methods: {
        setSortColumn(column) {
            if (this.sortColumn === column) {
                this.order = this.order === "ASC" ? "DESC" : "ASC";
            } else {
            this.order = "ASC";
            this.sortColumn = column;
            }
        }
   },
   computed: {
    filteredList() {
        const filteredList = this.searchString === ""
            ? this.dataList
            : this.dataList.filter(wo => Object.values(wo).join("").indexOf(this.searchString) !== -1);

        const column = this.sortColumn
        const order = this.order;

        filteredList.sort(function(a, b) {
            var nameA = a[column]+"".toUpperCase();
            var nameB = b[column]+"".toUpperCase();
            if (order === "DESC" && nameA > nameB) {
                return -1;
            }
            if (order === "DESC" && nameA < nameB) {
                return 1;
            }
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        return filteredList;
    },
},
   
}
</script>