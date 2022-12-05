import axios from "axios";
import * as Types from "../types";

const BASE_URL = "https://fakestoreapi.com";

// lay tat ca du lieu
export const getAll = () => async (dispatch) => {
  try {
    const result = await axios.get(`${BASE_URL}/products`);
    dispatch({ type: Types.GET_ALL, payload: result.data });
    console.log(result);
  } catch (error) {
    console.log("get api error: ", error);
  }
};

// xoa san pham
export const deleteProduct = (id) => {
  return function (dispatch) {
    axios
      .delete(`${BASE_URL}/products/${id}`)
      .then(() => {
        dispatch({
          type: Types.DELETE_PRODUCT,
          payload: id,
        });
      })
      .catch((error) => console.log("error", error));
  };
};

// them san pham
export const addProduct = (product) => {
  return function (dispatch) {
    axios
      .post(`${BASE_URL}/products`, product)
      .then((res) => {
        dispatch({
          type: Types.ADD_PRODUCT,
          payload: { ...res.data, ...product },
        });
      })
      .catch((error) => console.log("error", error));
  };
};

// lay 1 du lieu san pham theo id
export const getSingProduct = (id) => {
  return function (dispatch) {
    axios
      .get(`${BASE_URL}/products/${id}`)
      .then((res) => {
        console.log("res", res);
        dispatch({ type: Types.GET_PRODUCT, payload: res.data });
      })
      .catch((error) => console.log("error", error));
  };
};

// cap nhat san pham
export const updateProduct = (product, id) => {
  return function (dispatch) {
    axios
      .put(`${BASE_URL}/products/${id}`, product)
      .then((res) => {
        console.log("sua thnah cong", res);
        dispatch({ type: Types.UPDATE_PRODUCT, payload: res.data });
      })
      .catch((error) => console.log("error", error));
  };
};

// tim kiem
export const getSearchh = (search) => ({
  type: Types.GET_SEARCH,
  payload: search,
});
