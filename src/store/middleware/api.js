import * as actions from "../api";
import axios from "axios";

export const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);
  const { url, method, data, onStart, onSuccess, onError } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);
  try {
    const response = await axios.request({
      baseURL: process.env.REACT_APP_API_BASEURL,
      url,
      method,
      data,
    });
    console.log(response.data);
    dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    dispatch(actions.apiCallFailed(error.response.data.message));
    if (onError)
      dispatch({ type: onError, payload: error.response.data.message });
  }
};

export default api;
