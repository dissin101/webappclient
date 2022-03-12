import * as types from "../constants/brands";
import {AnyAction} from "redux";
import {IBrand} from "../../models/brand";

interface initialStateInterface {
  loading: boolean
  data: IBrand | null
  error: string | null
}

const initialState = {
  loading: false,
  data: null,
  error: null
};

export const brands = (state = initialState, action: AnyAction) => {
  switch (action.type){
    case types.GET_BRANDS_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
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
        data: null,
        error: action.payload
      }
    default: return state
  }
}