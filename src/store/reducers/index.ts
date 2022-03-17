import {combineReducers} from "redux";
import {brands} from "./brands";
import {models} from "./models";
import {categories} from "./categories";

export default combineReducers({
    brands,
    models,
    categories
});