export interface RegisterMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface Posts {
    _id: string;
    title: string;
    description: string;
    datetime: string,
    image: string | null;
    user: User,
}

export interface PostForAdd {
    title: string;
    description: string;
    image?: string | null;
    user: User | null;
}

export interface Comments {
    _id: string;
    post: Posts;
    user: User;
    text: string;
}