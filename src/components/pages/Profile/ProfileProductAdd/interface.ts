export interface IProfileProductAddForm {
    brandId: string
    modelId: string
    categoryId: string
    name: string
    price: string
    description: string
    type: string
    img: FileList | never[]
}
