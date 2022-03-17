import React from "react";
import {ICategory} from "../../models/category";

export interface ICategoriesTree {
    list: ICategory[]
    onSelectCallback: (value: any) => void
}

export interface ITreeItem {
    id: string
    onSelectCallback: (e: React.MouseEvent<HTMLInputElement>) => void
    label: string
    children: ReadonlyArray<JSX.Element>
}

export interface ICategoryTree {
    id: string
    name: string
    children: ICategoryTree[]
}