
export interface IButton {
    onClick?: (arg: any) => void
    type?: 'button' | 'submit'
    disabled?: boolean
    className?: string
    color?: 'primary' | 'info' | 'success'
}