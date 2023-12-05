export interface AuthenticatedUser {
    id: string;
    username: string;
    email: string;
    name: string;
    thuid: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    thuid: string;
    phone: string;
    department: string;
    qq: string;
}

export function createUserFromAuthenticatedUser(user: AuthenticatedUser): User {
    return {
        ...user,
        phone: '',
        department: '',
        qq: '',
    }
}