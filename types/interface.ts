export interface userDetails {
    email: string;
    phonenumber: string;
    password: string;
    interest: string;
    verified?: boolean
    _id?: string;
    username?: string
}

export interface loginDetails {
    username: string;
    password: string
}

export interface changePassword {
    password: string;
    newPassword: string
}