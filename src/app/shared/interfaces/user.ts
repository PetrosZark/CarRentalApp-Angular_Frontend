export interface UserReadOnly {
    id: string,
    username: string,
    firstname: string,
    lastname: string,
    vat: string,
    email: string,
    phone : string,
    dateOfBirth: string,
    gender: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    role: string
}

export interface UserInsert {
    firstname: string,
    lastname: string,
    email: string,
    vat: string,
    phone: string
    dateOfBirth: string,
    gender: string,
    username: string,
    password: string
}

export interface Credentials {
    username: string,
    password: string
}

export interface LoggedInUser {
    firstname: string,
    lastname: string,
    role: string
}
