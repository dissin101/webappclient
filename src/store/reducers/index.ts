import {combineReducers} from "redux";
import {brands} from "./brands";
import {models} from "./models";
import {categories} from "./categories";
import {products} from "./products";

export default combineReducers({
    brands,
    models,
    categories,
    products
});