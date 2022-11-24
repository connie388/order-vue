import axios from "axios";

const BASE_URL = "http://localhost:8080/thezone/";
// export const options = {
//   headers: { "content-type": "application/json" },
// };
export const ENDPOINTS = {
  CUSTOMER: "customer",
  ORDER: "order",
  PRODUCTLINE: "productline",
  PRODUCT: "product",
  ORDER_CUSTOMER: "order/customer",
};
export const createEndpoint = (endpoint) => {
  let url = BASE_URL + endpoint + "/";
  let api = {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (id, updateRecord) => axios.put(url + id, updateRecord),
    delete: (id) => axios.delete(url + id),
  };
  switch (endpoint) {
    // case ENDPOINTS.ORDER_DETAIL:
    //   api = {
    //     fetchById: (id) => axios.get(url + id),
    //     deleteByIds: (id, code) => axios.delete(url + id + "/" + code),
    //     update: (id, code, updateRecord) =>
    //       axios.put(url + id + "/" + code, updateRecord),
    //   };
    //   break;
    case ENDPOINTS.ORDER_CUSTOMER:
      api = {
        fetchByNameAndDateRange: (name, fromDate, toDate) =>
          axios.get(
            BASE_URL +
              endpoint +
              "?customerNameLike=" +
              name +
              (fromDate ? "&fromDate=" + fromDate : "") +
              (toDate ? "&toDate=" + toDate : "")
          ),
      };
      break;
    case ENDPOINTS.CUSTOMER:
      api = {
        ...api,
        fetchByName: (name) => axios.get(BASE_URL + endpoint + "?name=" + name),
      };
      break;
    case ENDPOINTS.ORDER:
      api = {
        ...api,
        fetchByIdAndDateRange: (id, fromDate, toDate) =>
          axios.get(
            BASE_URL +
              id +
              "/" +
              endpoint +
              (fromDate || toDate
                ? "?" +
                  (fromDate ? "fromDate=" + fromDate : "") +
                  (fromDate && toDate ? "&" : "") +
                  (toDate ? "toDate=" + toDate : "")
                : "")
          ),
      };
      break;
    case ENDPOINTS.PRODUCT:
      api = {
        ...api,
        fetchAllByCategory: (category) =>
          axios.get(BASE_URL + category + "/" + endpoint),
      };
      break;
    default:
      break;
  }

  return api;
};
