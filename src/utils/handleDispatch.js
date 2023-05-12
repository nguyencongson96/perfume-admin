import store from "../redux/store/index";
import inputList from "./productFormConfig";
import productAPI from "../service/productAPI";
import orderAPI from "../service/orderAPI";
// import ordersReducer from "../redux/reducers/order";

const maxQuantity = 3;
const productsReducer = () => store.getState().productsReducer;
// const ordersReducer = () => store.getState().ordersReducer;

const handleDispatch = {
  loading: {
    show: function () {
      store.dispatch({ type: "SHOW_LOADING", payload: { status: true } });
    },
    hide: function () {
      store.dispatch({ type: "HIDE_LOADING", payload: { status: false } });
    },
  },
  product: {
    form: {
      add: async function (fieldName) {
        try {
          const { info } = await productsReducer().isDetail;
          const item = inputList.find((e) => e.field === fieldName);
          if (item.typeInput === "object")
            item.detail.forEach((subField) => {
              info[subField.name].length < maxQuantity && info[subField.name].push(0);
            });
          else info[fieldName].length < maxQuantity && info[fieldName].push(" ");

          await store.dispatch({
            type: "UPDATE_PRODUCT",
            payload: { info: info, status: true },
          });
        } catch (err) {
          console.log(err);
        }
      },
      delete: async function (fieldName, delIndex) {
        try {
          const { info } = await productsReducer().isDetail;
          //Find typeInput, detail which have already config in inputList file
          const item = inputList.find((e) => e.field.includes(fieldName));

          //Config newVal to update to redux
          item.typeInput === "object"
            ? item.detail.forEach(({ name }) => info[name].splice(delIndex, 1))
            : info[fieldName].splice(delIndex, 1);

          await store.dispatch({
            type: "UPDATE_PRODUCT",
            payload: { info: { ...info }, status: true },
          });
        } catch (err) {
          console.log(err);
        }
      },
      onChange: async function (fieldName, oldVal, newVal) {
        const { info } = await productsReducer().isDetail;
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
          store.dispatch({
            type: "UPDATE_PRODUCT",
            payload: { info: { ...info }, status: true },
          });
        } catch (err) {
          console.log(err);
        }
      },
      onSubmit: async function (info) {
        try {
          if (!info._id) {
            const newProduct = await productAPI.addNew(info);
            await store.dispatch({ type: "ADD_NEW_PRODUCT", payload: { info: newProduct } });
          } else {
            await productAPI.update({ ...info, id: info._id });
            await store.dispatch({ type: "UPDATE_PRODUCT", payload: { info: info } });
          }
        } catch (err) {
          console.log(err);
        }
      },
      close: async function () {
        try {
          store.dispatch({ type: "UPDATE_PRODUCT", payload: { status: false } });
        } catch (err) {
          console.log(err);
        }
      },
    },
    list: {
      filter: async function (filterObj) {
        try {
          handleDispatch.loading.show();
          await store.dispatch({ type: "FILTER_PRODUCT_OBJ", payload: filterObj });
          const newfilterObj = await productsReducer().filter;
          const { list, numberOfPages } = await productAPI.getAll(newfilterObj);
          await store.dispatch({ type: "GET_PRODUCTS_ALL", payload: list || [], pages: numberOfPages });
          handleDispatch.loading.hide();
        } catch (err) {
          console.log(err);
        }
      },
      getDetail: async function (info) {
        try {
          handleDispatch.loading.show();
          const productDetail = info
            ? await productAPI.detail(info._id)
            : {
                name: "New Product",
                brand: "New Brand",
                type: ["Example"],
                aroma: ["Example"],
                capacity: [1000],
                price: [1000],
                stock: [1000],
                image: ["Example"],
                description: "Example",
              };
          await store.dispatch({
            type: "GET_PRODUCT_DETAIL",
            payload: { info: productDetail },
          });
          handleDispatch.loading.hide();
        } catch (err) {
          console.log(err);
        }
      },
      delete: async function () {
        try {
          const { _id } = await productsReducer().isDetail.info;
          await productAPI.delete(_id);
          await store.dispatch({ type: "DELETE_PRODUCT", payload: { id: _id } });
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
          handleDispatch.loading.show();
          await store.dispatch({ type: "FILTER_ORDER_OBJ", payload: filterObj });
          const { list, numberOfPages } = await orderAPI.filter(filterObj);
          await store.dispatch({ type: "GET_ORDERS_ALL", payload: list, pages: numberOfPages });
          handleDispatch.loading.hide();
        } catch (err) {
          console.log(err);
        }
      },
      detail: async function (id) {
        try {
          handleDispatch.loading.show();
          const foundOrder = await orderAPI.detail(id);
          await store.dispatch({ type: "GET_DETAIL_ORDER", payload: foundOrder });
          handleDispatch.loading.hide();
        } catch (err) {
          console.log(err);
        }
      },
      update: async function (order) {
        try {
          handleDispatch.loading.show();
          console.log(order);
          const updatedOrder = await orderAPI.update(order._id, order);
          await store.dispatch({ type: "UPDATE_ORDER", payload: updatedOrder });
        } catch (err) {
          console.log(err);
        } finally {
          handleDispatch.loading.hide();
        }
      },
    },
  },
};

export default handleDispatch;
