import axios from "axios";

//Create an instance of axios with a base URL and headers
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

//Add an interceptor to modify the request config before sending it
axiosClient.interceptors.request.use(async (config) => {
  return config;
});

//Add an interceptor to modify the response data before returning it to your code
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient;
