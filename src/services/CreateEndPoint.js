import axios from "axios";

const BASE_URL = "http://localhost:8080/thezone/";

export const ENDPOINTS = {
  CUSTOMER: "customer",
  ORDER: "order",
  PRODUCTLINE: "productline",
  PRODUCT: "product",
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
    case ENDPOINTS.CUSTOMER:
      api = {
        ...api,
        fetchByName: (name) => axios.get(BASE_URL + endpoint + "?name=" + name),
      };
      break;
    // return {
    //   fetchAll: () => axios.get(url),
    //   fetchByName: (name) => axios.get(BASE_URL + endpoint + "?name=" + name),
    //   fetchById: (id) => axios.get(url + id),
    //   create: (newRecord) => axios.post(url, newRecord),
    //   update: (id, updateRecord) => axios.put(url + id, updateRecord),
    //   delete: (id) => axios.delete(url + id),
    // };
    case ENDPOINTS.ORDER:
      // return {
      //   fetchAll: () => axios.get(url),
      //   fetchByName: (name) => axios.get(BASE_URL + endpoint + "?name=" + name),
      //   fetchById: (id) => axios.get(url + id),
      //   create: (newRecord) => axios.post(url, newRecord),
      //   update: (id, updateRecord) => axios.put(url + id, updateRecord),
      //   delete: (id) => axios.delete(url + id),
      //   fetchByIdAndDateRange: (id, fromDate, toDate) =>
      //     axios.get(
      //       BASE_URL + id + "/" + endpoint + "/" + fromDate + "/" + toDate
      //     ),
      // };
      api = {
        ...api,
        fetchByIdAndDateRange: (id, fromDate, toDate) =>
          axios.get(
            BASE_URL + id + "/" + endpoint + "/" + fromDate + "/" + toDate
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
    // return {
    //   fetchAll: () => axios.get(url),
    //   fetchAllByCategory: (category) =>
    //     axios.get(BASE_URL + category + "/" + endpoint),
    //   fetchById: (id) => axios.get(url + id),
    //   create: (newRecord) => axios.post(url, newRecord),
    //   update: (id, updateRecord) => axios.put(url + id, updateRecord),
    //   delete: (id) => axios.delete(url + id),
    // };
    default:
      break;
    // return {
    //   fetchAll: () => axios.get(url),
    //   fetchAllByCategory: (category) =>
    //     axios.get(BASE_URL + category + "/" + endpoint),
    //   fetchById: (id) => axios.get(url + id),
    //   create: (newRecord) => axios.post(url, newRecord),
    //   update: (id, updateRecord) => axios.put(url + id, updateRecord),
    //   delete: (id) => axios.delete(url + id),
    // };
  }

  return api;
};
