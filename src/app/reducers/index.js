import { combineReducers } from "redux";
import { productReducer } from "../../Features/Products/ProductSlice";
import { userReducer } from "../../Features/User/UserSlice";
import { couponsReducer } from "../../Features/Coupons/CuponSlice";

export default combineReducers({
  products: productReducer,
  user: userReducer,
  coupons: couponsReducer,
});
