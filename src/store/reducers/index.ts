import {combineReducers} from "redux";
import {brands} from "./brands";
import {models} from "./models";
import {categories} from "./categories";
import {products} from "./products";
import {product} from "./product";

export default combineReducers({
    brands,
    models,
    categories,
    products,
    product
});