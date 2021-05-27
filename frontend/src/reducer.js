export const initialState = {
  user: null,
  token: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    default:
      return state;
  }
};

export default reducer;
