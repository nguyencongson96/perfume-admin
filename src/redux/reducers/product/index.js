const initStateReducer = {
  isDetail: { status: false, info: {} },
  list: [],
  pages: 1,
  filter: {},
};

const productsReducer = (state = initStateReducer, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_ALL":
      return { ...state, list: action.payload, pages: action.pages };

    case "GET_PRODUCT_DETAIL":
      return { ...state, isDetail: { status: true, info: action.payload.info } };

    case "ADD_NEW_PRODUCT":
      return { ...state, isDetail: { status: false, info: {} }, list: [...state.list, action.payload.info] };

    case "UPDATE_PRODUCT":
      const { info, status } = action.payload;
      if (info) {
        const foundProduct = state.list.find((item) => item._id === info._id);
        const keyArr = Object.keys(info);
        keyArr.forEach((key) => (foundProduct[key] = info[key]));
      }
      return {
        ...state,
        isDetail: { status: status || false, info: info || state.isDetail.info },
      };

    case "DELETE_PRODUCT":
      const newList = state.list.filter((product) => product._id !== action.payload.id);
      return {
        ...state,
        list: newList,
        isDetail: { status: false, info: {} },
      };

    case "FILTER_PRODUCT_OBJ":
      return { ...state, filter: { ...state.filter, ...action.payload } };

    default:
      return state;
  }
};

export default productsReducer;
