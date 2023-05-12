import axiosClient from "../utils/axiosClient";

const url = `order/admin`;
const orderAPI = {
  getAll: () => axiosClient.get(url),
  addNew: (data) => axiosClient.post(url, data),
  update: (id, data) => axiosClient.put(`${url}/${id}`, data),
  delete: (data) => axiosClient.delete(url, data),
  detail: (params) => axiosClient.get(`${url}/${params}`),
  filter: (queryObj) => {
    const queryString = Object.keys(queryObj).reduce(
      (result, key) => (result += `${key}=${queryObj[key]}&`),
      "?"
    );
    return axiosClient.get(`${url}${queryString}`);
  },
};

export default orderAPI;
