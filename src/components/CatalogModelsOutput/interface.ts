import {IModel} from "../../models/model";

export interface ICatalogModelsOutput {
    models: IModel[]
    onClickModelHandler: (model: string) => void
}