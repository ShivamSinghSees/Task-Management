import { Session } from "inspector";

export type IconName = "home" | "boards" | "setting" | "teams" | "analytics";
export type Priority = "Urgent" | "Low" | "Medium";
export interface ReducerState {
  isLoading: boolean;
  error: string | null;
}

export interface UserState extends ReducerState {
  currentUser: User | null;
}

export interface TaskState extends ReducerState {
  tasks: Task[];
}

export interface SideBarOption {
  name: string;
  icon: IconName;
}

export interface SideBarState extends ReducerState {
  sidebar: SideBarOption[];
}

export interface Feature {
  readonly title: string;
  readonly description: string;
  readonly imgUrl: string;
}
export interface FeatureState extends ReducerState {
  feature: readonly Feature[];
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState extends ReducerState {
  user: User | null;
  token: string | null;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: Priority | null;
  deadline: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface TaskGroup {
  status: string;
  id: "column-1" | "column-2" | "column-3" | "column-4";
  tasks: Task[];
}
export interface CustomSession extends Session {
  user: {
    name: string;
    email: string;
    id: string;
    image: string;
    role: string;
  };
}
