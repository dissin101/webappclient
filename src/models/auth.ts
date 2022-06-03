
export interface ILogin {
    email: string
    password: string
}

export interface IRegistration {
    email: string
    password: string
    confirmPassword: string
}

export interface ICheck {

}

export interface IUser {
    id: number
    email: string
    role: string
    iat: number
    exp: number
}