const initStateReducer = {
  status: false,
};

const loadingReducer = (state = initStateReducer, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return { ...state, status: true };

    case "HIDE_LOADING":
      return { ...state, status: false };

    default:
      return state;
  }
};

export default loadingReducer;
