export interface IProfileCategoryAddModal {
    options: {
        label: string
        value: string
    }[]
    closeHandler: () => void
}

export interface IProfileCategoryAddForm {
    name: string
    parentId: string | null
}