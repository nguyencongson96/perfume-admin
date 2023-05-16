import store from "../redux/store";
import inputList from "./productFormConfig";
import productReducer from "../redux/reducers/product";
import ordersReducer from "../redux/reducers/order";
import {
  addNewProduct,
  updateProduct,
  removeProduct,
  getAllProduct,
  detailProduct,
} from "../redux/reducers/product";

import { getAllOrders, getOrderDetail, getOrderUpdate } from "../redux/reducers/order";

const maxQuantity = 3;
const productsState = () => store.getState().products,
  productAction = (type, content) => store.dispatch(productReducer.actions[type](content)),
  orderAction = (type, content) => store.dispatch(ordersReducer.actions[type](content));
// const ordersState = () => store.getState().orders;

const handleDispatch = {
  product: {
    form: {
      add: async function (fieldName) {
        const info = JSON.parse(JSON.stringify(productsState().isDetail.info));
        const item = inputList.find((e) => e.field === fieldName);
        if (item.typeInput === "object")
          item.detail.forEach((subField) => {
            info[subField.name].length < maxQuantity && info[subField.name].push(0);
          });
        else info[fieldName].length < maxQuantity && info[fieldName].push(" ");

        productAction("update", { info: info, status: true });
      },
      delete: async function (fieldName, delIndex) {
        try {
          const info = JSON.parse(JSON.stringify(productsState().isDetail.info));
          //Find typeInput, detail which have already config in inputList file
          const item = inputList.find((e) => e.field.includes(fieldName));

          //Config newVal to update to redux
          item.typeInput === "object"
            ? item.detail.forEach(({ name }) => info[name].splice(delIndex, 1))
            : info[fieldName].splice(delIndex, 1);

          productAction("update", { info: { ...info }, status: true });
        } catch (err) {
          console.log(err);
        }
      },
      onChange: async function (fieldName, oldVal, newVal) {
        const info = JSON.parse(JSON.stringify(productsState().isDetail.info));
        const { typeInput } = inputList.find((e) => e.field.includes(fieldName));

        switch (typeInput) {
          case "text":
            info[fieldName] = newVal;
            break;

          case "array":
            const indexInArr = info[fieldName].findIndex((item) => item === oldVal);
            info[fieldName][indexInArr] = newVal;
            break;

          case "object":
            const indexInArrObj = info[fieldName].findIndex((item) => item === oldVal);
            info[fieldName][indexInArrObj] = Number(newVal);
            break;

          default:
            break;
        }
        try {
          productAction("update", { info: info, status: true });
        } catch (err) {
          console.log(err);
        }
      },
      onSubmit: async function (info) {
        try {
          !info._id
            ? await store.dispatch(addNewProduct(info))
            : await store.dispatch(updateProduct({ ...info, id: info._id }));
        } catch (err) {
          console.log(err);
        }
      },
      close: async function () {
        try {
          productAction("update", { status: false });
        } catch (err) {
          console.log(err);
        }
      },
    },
    list: {
      filter: async function (filterObj) {
        try {
          await productAction("filterProductObj", filterObj);
          const newfilterObj = productsState().filter;
          await store.dispatch(getAllProduct(newfilterObj));
        } catch (err) {
          console.log(err);
        }
      },
      getDetail: async function (info) {
        try {
          info
            ? await store.dispatch(detailProduct(info._id))
            : await productAction("getProductDetail", {
                info: {
                  name: "New Product",
                  brand: "New Brand",
                  type: ["Example"],
                  aroma: ["Example"],
                  capacity: [1000],
                  price: [1000],
                  stock: [1000],
                  image: ["Example"],
                  description: "Example",
                },
              });
        } catch (err) {
          console.log(err);
        }
      },
      delete: async function () {
        try {
          const { _id } = productsState().isDetail.info;
          store.dispatch(removeProduct(_id));
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
  order: {
    list: {
      filter: async function (filterObj) {
        try {
          !filterObj && (filterObj = {});
          await orderAction("filterOrderObj", filterObj);
          await store.dispatch(getAllOrders(filterObj));
        } catch (err) {
          console.log(err);
        }
      },
      detail: async function (id) {
        try {
          store.dispatch(getOrderDetail(id));
        } catch (err) {
          console.log(err);
        }
      },
      update: async function (order) {
        try {
          store.dispatch(getOrderUpdate(order));
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
};

export default handleDispatch;
