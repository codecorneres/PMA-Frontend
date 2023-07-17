import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

console.log(initialState.isAuthenticated, "bababab");

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  // console.log(payload, "token will lie here jghfasdweft");
  // console.log(type, "token will lie here type");

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // console.log("payload", payload);
      localStorage.setItem("token", payload.user.token);
      return {
        ...state,
        ...payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
