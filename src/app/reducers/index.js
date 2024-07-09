import { combineReducers } from "redux";
import { productReducer } from "../../Features/Products/ProductSlice";
import { userReducer } from "../../Features/User/UserSlice";

export default combineReducers({
  products: productReducer,
  user: userReducer,
});
