import React from "react";

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