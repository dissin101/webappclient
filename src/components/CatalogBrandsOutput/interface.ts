import {IBrand} from "../../models/brand";

export interface ICatalogBrandsOutput {
    brands: IBrand[]
    onClickBrandHandler: (brand: string) => void
}