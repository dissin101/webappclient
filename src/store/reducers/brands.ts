import * as types from "../constants/brands";
import {AnyAction} from "redux";
import {IBrand} from "../../models/brand";

interface IInitialState {
  isBrandAdd: boolean
  loading: boolean
  data: IBrand[] | []
  error: string | null
}

const initialState: IInitialState = {
  isBrandAdd: false,
  loading: false,
  data: [],
  error: null
};

export const brands = (state = initialState, action: AnyAction) => {
  switch (action.type){
    case types.GET_BRANDS_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        error: null
      }
    case types.GET_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case types.GET_BRANDS_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload
      }
    case types.ADD_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
        isBrandAdd: false,
        error: null
      }
    case types.ADD_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        isBrandAdd: true,
        error: null
      }
    case types.ADD_BRAND_FAILURE:
      return {
        ...state,
        loading: false,
        isBrandAdd: false,
        error: action.payload
      }
    default: return state
  }
}