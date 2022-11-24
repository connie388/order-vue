<template>
  <div>
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
            :class="[field.type == 'number' ? 'text-right' : 'text-left']"
            class="px-6 py-3 text-xs font-bold uppercase"
            v-for="field in fields"
            :key="field.column"
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
          <th
            v-if="addRow"
            scope="col"
            class="px-6 py-3 text-sm font-bold text-right text-gray-500"
          >
            <BaseButton
              className="btn-green"
              @click="addNewRecord"
              label="+Add Record"
            />
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(item, index) in tableItems" :key="index">
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
            class="px-6 py-4 text-xs font-medium text-gray-800 whitespace-nowrap"
            v-for="field in fields"
            :key="field.column"
            @click="onclick(item, index)"
          >
            <div v-if="editMode">
              <BaseInput
                id="item[field.column]"
                type="field.type"
                :className="[
                  field.type == 'number'
                    ? 'field-input text-right'
                    : 'field-input text-left',
                ]"
                v-model="item[field.column]"
              />
            </div>
            <div v-else>
              {{ item[field.column] }}
            </div>
          </td>

          <td
            v-if="editEnable"
            class="px-6 py-4 text-xs font-medium text-right whitespace-nowrap"
            @click="editItem(item)"
          >
            <a class="text-green-500 hover:text-green-700" href="#">
              <i class="fa-solid fa-pen-to-square"></i
            ></a>
          </td>
          <td
            v-if="deleteEnable"
            class="px-6 py-4 text-xs font-medium text-right whitespace-nowrap"
            @click="removeRecord(item, index)"
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
import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";

export default {
  name: "TableComponent",
  emits: ["onclick", "viewItem", "editItem", "deleteItem"],
  components: {
    BaseInput,
    BaseButton,
  },
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    addRow: {
      type: Boolean,
      default: false,
    },
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

      tableItems: [],
    };
  },

  created() {
    // watch the props to fetch the data again
    this.$watch(
      () => this.dataList,
      () => {
        this.tableItems = this.dataList?.map((item) => ({
          ...item,
          // isEdit: false,
        }));
      },
      { immediate: true }
    );
  },

  methods: {
    onclick(item) {
      this.$emit("onclick", item);
    },

    getTableItems() {
      return this.tableItems;
    },
    viewItem(item) {
      this.$emit("viewItem", item);
    },
    editItem(item) {
      this.$emit("editItem", item);
    },

    removeRecord(item, index) {
      this.tableItems = this.tableItems.filter((item, i) => i !== index);
      this.$emit("deleteItem", item);
    },

    addNewRecord() {
      const newRow = this.fields.reduce((a) => ({ ...a }), {});
      this.tableItems?.unshift(newRow);
    },
  },
};
</script>
