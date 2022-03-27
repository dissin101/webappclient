import {HTMLInputTypeAttribute} from "react";

export interface IInput {
    value?: string | number
    className?: string
    onChange?: (arg: any) => void
    type?: HTMLInputTypeAttribute
}