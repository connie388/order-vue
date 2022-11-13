import axios from "axios";

const BASE_URL = "http://localhost:8080/thezone/";

export const ENDPOINTS = {
  CUSTOMER: "customer",
  PRODUCTLINE: "productline",
  PRODUCT: "product",
};
export const createEndpoint = (endpoint) => {
  let url = BASE_URL + endpoint + "/";
  switch (endpoint) {
    case ENDPOINTS.CUSTOMER:
      return {
        fetchAll: () => axios.get(url),
        fetchByName: (name) => 
          // console.log(BASE_URL + endpoint + "?name=" + name)
          axios.get(BASE_URL + endpoint + "?name=" + name),
        fetchById: (id) => axios.get(url + id),
        create: (newRecord) => axios.post(url, newRecord),
        update: (id, updateRecord) => axios.put(url + id, updateRecord),
        delete: (id) => axios.delete(url + id),
      };
    default:
      return {
        fetchAll: () => axios.get(url),
        fetchAllByCategory: (category) =>
          axios.get(BASE_URL + category + "/" + endpoint),
        fetchById: (id) => axios.get(url + id),
        create: (newRecord) => axios.post(url, newRecord),
        update: (id, updateRecord) => axios.put(url + id, updateRecord),
        delete: (id) => axios.delete(url + id),
      };
  }
};
