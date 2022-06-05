import React from "react";

export interface IModal {
    children: React.ReactNode
    isVisible: boolean
    header?: string
    onClose: () => void
}