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
  created_at?: number;
}

export function createUserFromAuthenticatedUser(user: AuthenticatedUser): User {
  return {
    ...user,
    phone: "",
    department: "",
    qq: "",
  };
}

export interface Pagination {
  per_page: number;
  page: number;
}

export interface AllUsersResponse {
  users: User[];
  total: number;
}

export interface Problem {
  question: string;
  options: string[];
}
