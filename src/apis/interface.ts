export interface ISignUpData {
    name?: string;
    password: string;
    email: string; 
}

export interface ITodoData {
    name: string;
    completed: boolean;
    flag?: boolean;
    readonly _id?: string;
    description?: string;
    readonly creator?: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
    scheduleTime?: string;
    readonly __v?: number;
}

export interface IUserData {
    name: string;
    _id?: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number
}