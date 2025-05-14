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

export interface AuthProcessing {
  login: boolean;
  register: boolean;
}

export interface Board {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  columns?: Column[];
}

export interface BoardProcessing {
  getBoards: boolean;
  getBoard: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface BoardForm {
  title: string;
  description: string;
}

export interface Column {
  id: number;
  title: string;
  description: string;
  position: number;
  createdAt: string;
  tasks?: Task[];
  relations: { board_id?: number };
}

export interface ColumnProcessing {
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface ColumnForm {
  title: string;
  description: string;
}

export interface Task {
  id: number;
  description: string;
  position: number;
  createdAt: string;
  relations: [column_id?: number];
}

export interface TaskProcessing {
  create: boolean;
  update: boolean;
  delete: boolean;
  move: boolean;
}

export interface TaskForm {
  description: string;
}
