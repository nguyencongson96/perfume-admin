import axiosClient from "../utils/axiosClient";

const url = `products`;
const productAPI = {
  getAll: (queryObj) => {
    const queryString = Object.keys(queryObj).reduce(
      (result, key) => (result += `${key}=${queryObj[key]}&`),
      "?"
    );
    return axiosClient.get(`filter${queryString}`);
  },
  addNew: (data) => axiosClient.post(url, data),
  update: (data) => axiosClient.patch(url, data),
  delete: (id) => axiosClient.delete(`${url}/${id}`),
  detail: (params) => axiosClient.get(`${url}/${params}`),
};

export default productAPI;
