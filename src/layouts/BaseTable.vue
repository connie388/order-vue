<template>
  <div v-if="dataList?.length === 0">
    <div v-if="showmsg">No data available</div>
  </div>

  <div v-else>
    <div v-if="filterEnable">
      <div class="flex items-center space-x-2">
        <div class="relative">
          <span
            class="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2"
          >
            <div>
              <i class="fa-solid fa-filter fa-lg"></i>
            </div>
            <div class="hidden sm:block">Filters:</div>
          </span>
        </div>
      </div>

      <div class="flex justify-between py-3 pl-2">
        <div
          class="relative min-w-xs"
          v-for="field of fields"
          :key="field.column"
        >
          <input
            v-model="searchString[field.column]"
            :placeholder="field.header"
            class="px-6 py-4 text-xs font-medium text-right whitespace-nowrap"
          />
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
          >
            <i class="fa-solid fa-magnifying-glass fa-2xs text-gray-500"></i>
          </div>
        </div>
      </div>
    </div>

    <table id="tableComponent" class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <div v-if="checkboxEnable">
            <th scope="col" class="py-3 pl-4">
              <div class="flex items-center h-5">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  class="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                />
                <label for="checkbox" class="sr-only"> Checkbox </label>
              </div>
            </th>
          </div>
          <!-- loop through each value of the fields to get the table header -->
          <th
            scope="col"
            class="px-6 py-3 text-xs font-bold text-left text-gray-500"
            v-for="field in fields"
            :key="field.column"
            @click="setSortColumn(field.column)"
          >
            {{ field.header }}

            <i
              v-if="field.column == sortColumn && order == 'DESC'"
              class="fa-solid fa-arrow-down"
            ></i>
            <i
              v-if="field.column == sortColumn && order == 'ASC'"
              class="fa-solid fa-arrow-up"
            ></i>
          </th>
          <th
            v-if="viewEnable"
            scope="col"
            class="px-6 py-3 text-sm font-bold text-right text-gray-500"
          >
            View
          </th>
          <th
            v-if="editEnable"
            scope="col"
            class="px-6 py-3 text-sm font-bold text-right text-gray-500"
          >
            Edit
          </th>
          <th
            v-if="deleteEnable"
            scope="col"
            class="px-6 py-3 text-sm font-bold text-right text-gray-500"
          >
            Delete
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(item, index) in filteredList" :key="index">
          <div v-if="checkboxEnable">
            <td class="border py-3 pl-4">
              <div class="flex items-center h-5">
                <input
                  type="checkbox"
                  class="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                />
                <label for="checkbox" class="sr-only"> Checkbox </label>
              </div>
            </td>
          </div>
          <td
            class="text-right px-6 py-4 text-xs font-medium text-gray-800 whitespace-nowrap"
            :class="{ active: index == this.currentIndex }"
            v-for="field in fields"
            :key="field.column"
            @click="onclick(item, index)"
          >
            {{ item[field.column] }}
          </td>

          <td
            v-if="viewEnable"
            class="px-6 py-4 text-xs font-medium text-right whitespace-nowrap"
            @click="viewItem(item, index)"
          >
            <a class="text-blue-500 hover:text-blue-700" href="#">
              <i class="fa-solid fa-eye"></i
            ></a>
          </td>
          <td
            v-if="editEnable"
            class="px-6 py-4 text-xs font-medium text-right whitespace-nowrap"
            @click="editItem(item, index)"
          >
            <a class="text-green-500 hover:text-green-700" href="#">
              <i class="fa-solid fa-pen-to-square"></i
            ></a>
          </td>
          <td
            v-if="deleteEnable"
            class="px-6 py-4 text-xs font-medium text-right whitespace-nowrap"
            @click="deleteItem(item, index)"
          >
            <a class="text-red-500 hover:text-red-700" href="#">
              <i class="fa-solid fa-trash-can"></i
            ></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "TableComponent",
  emits: ["onclick", "viewItem", "editItem", "deleteItem"],
  props: {
    //
    viewEnable: {
      type: Boolean,
      default: true,
    },
    editEnable: {
      type: Boolean,
      default: true,
    },
    deleteEnable: {
      type: Boolean,
      default: true,
    },
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
    filterEnable: {
      type: Boolean,
      default: false,
    },
    checkboxEnable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sortColumn: "",
      order: "ASC",
      searchString: [],
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

    viewItem(item, index) {
      this.currentIndex = index;
      this.$emit("viewItem", item);
    },
    editItem(item, index) {
      this.currentIndex = index;
      this.$emit("editItem", item);
    },
    deleteItem(item, index) {
      this.currentIndex = index;
      this.$emit("deleteItem", item);
    },
  },
  computed: {
    filteredList() {
      var filteredList = this.dataList;
      for (let i = 0; i < this.fields?.length; i++) {
        filteredList = this.searchString[this.fields[i]["column"]]
          ? filteredList.filter((wo) => {
              let str = "" + wo[this.fields[i]["column"]];
              return str.includes(this.searchString[this.fields[i]["column"]]);
            })
          : filteredList;
      }
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
