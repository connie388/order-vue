<template>
  <div v-if="dataList.length === 0">
    <div v-if="showmsg">No data available</div>
  </div>

  <div v-else>
    <input v-model="searchString" placeholder="search" class="mb-1" />

    <table id="tableComponent" class="shadow-lg bg-white border-collapse">
      <thead>
        <tr>
          <!-- loop through each value of the fields to get the table header -->
          <th
            class="bg-blue-100 border text-left"
            v-for="field in fields"
            :key="field.column"
            @click="setSortColumn(field.column)"
          >
            {{ field.header }} <i class="fa-solid fa-sort"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredList" :key="index">
          <td
            class="border"
            :class="{ active: index == this.currentIndex }"
            v-for="field in fields"
            :key="field.column"
            @click="onclick(item, index)"
          >
            {{ item[field.column] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "TableComponent",
  emits: ["onclick"],
  props: {
    //
    dataList: {
      type: Array,
    },
    fields: {
      type: Array,
    },
    showmsg: {
      type: Boolean,
      default: false,
    },
    reset: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sortColumn: "",
      order: "ASC",
      searchString: "",
      currentIndex: -1,
    };
  },
  created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.reset,
      () => {
        this.currentIndex = -1;
      },
      { immediate: true }
    );
  },
  methods: {
    setSortColumn(column) {
      if (this.sortColumn === column) {
        this.order = this.order === "ASC" ? "DESC" : "ASC";
      } else {
        this.order = "ASC";
        this.sortColumn = column;
      }
    },
    onclick(item, index) {
      this.currentIndex = index;
      this.$emit("onclick", item);
    },
  },
  computed: {
    filteredList() {
      const filteredList =
        this.searchString === ""
          ? this.dataList
          : this.dataList.filter(
              (wo) =>
                Object.values(wo).join("").indexOf(this.searchString) !== -1
            );

      const column = this.sortColumn;
      const order = this.order;

      filteredList.sort(function (a, b) {
        var nameA = a[column] + "".toUpperCase();
        var nameB = b[column] + "".toUpperCase();
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
};
</script>
