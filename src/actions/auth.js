import axios from "axios";
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT } from "./types";
import setAuthToken from "../utils/setAuthToken";
import BASE_URL from "../utils/baseurl";

// Load Token
export const loadToken = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
};

// Register User
export const register =
  (name, email, password, role_id) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password, role_id });

    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, body, config);

      // console.log(res.data, "user register data");
      // console.log(BASE_URL, "base url");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    loadToken();
  } catch (error) {
    console.log(error);
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
