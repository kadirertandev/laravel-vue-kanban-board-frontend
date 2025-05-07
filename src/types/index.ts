import type { AxiosError } from "axios";

export interface CustomError {
  status?: number | null;
  original: AxiosError;
  validation: Record<string, string>;
  message: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface Processing {
  login: boolean;
  register: boolean;
}

export interface Board {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface BoardProcessing {
  getBoards: boolean;
  create: boolean;
}

export interface CreateBoardForm {
  title: string;
  description: string;
}
