import {
  REGISTER_USER,
  LOGIN_USER,
  CURRENT_USER,
  LOGOUT_USER,
  LOAD_USER,
  FAIL_USER,
  CLEAR_ERRORS
} from "../const/userConst";
import axios from "axios";

export const registerUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/user/register", user);
    dispatch({ type: REGISTER_USER, payload: result.data });
    history.push("/home");
  } catch (error) {
    const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }
  }
};

export const loginrUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/user/login", user);
    dispatch({ type: LOGIN_USER, payload: result.data });
    history.push("/home");
  } catch (error) {
    const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }
  }}

export const current = () => async (dispatch) => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    dispatch({ type: LOAD_USER });
    try {
      let { data } = await axios.get("/user/current", config);
      dispatch({ type: CURRENT_USER, payload: data });
    } catch (error) {
      dispatch({ type: FAIL_USER, payload: error.response.data });
    }
  };
  
  export const logout = () => {
    return {
      type: LOGOUT_USER,
    };
  };
  
  export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS,
    };
  };