type UserId = string;
type IconName = "home" | "boards" | "setting" | "teams" | "analytics";
type Priority = "urgent" | "low" | "medium";
interface ReducerState {
  isLoading: boolean;
  error: string | null;
}

interface UserState extends ReducerState {
  currentUser: User | null;
}

interface SideBarOption {
  name: string;
  icon: IconName;
}

interface SideBarState extends ReducerState {
  sidebar: SideBarOption[];
}

interface Feature {
  readonly title: string;
  readonly description: string;
  readonly imgUrl: string;
}
interface FeatureState extends ReducerState {
  feature: readonly Feature[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState extends ReducerState {
  user: User | null;
  token: string | null;
}

interface OriginalTask {
  _id: string;
  title: string;
  description: string;
  status: "To Do" | "In progress" | "Under review" | "Finished";
  priority: string;
  deadline: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TransformedTask {
  title: string;
  description: string;
  status: "To Do" | "In progress" | "Under review" | "Finished";
  priority: string;
  deadline: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface TaskGroup {
  status: "To Do" | "In progress" | "Under review" | "Finished";
  id: "column-1" | "column-2" | "column-3" | "column-4";
  tasks: TransformedTask[];
}
