const initStateReducer = {
  list: [],
  pages: 1,
  filter: {},
  detail: {},
};

const ordersReducer = (state = initStateReducer, action) => {
  switch (action.type) {
    case "GET_ORDERS_ALL":
      return { ...state, list: action.payload || [], pages: action.pages || 1 };

    case "GET_DETAIL_ORDER":
      return { ...state, detail: action.payload };

    case "UPDATE_ORDER":
      const updateOrder = action.payload;
      const index = state.list.findIndex((item) => item._id === updateOrder._id);
      state.list.splice(index, 1, updateOrder);
      return { ...state };

    case "FILTER_ORDER_OBJ":
      return { ...state, filter: { ...state.filter, ...action.payload } };

    default:
      return state;
  }
};

export default ordersReducer;
