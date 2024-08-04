import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformData(originalData: Task[]): TaskGroup[] {
  const statusMap: Record<Task["status"], TaskGroup["id"]> = {
    "To Do": "column-1",
    "In progress": "column-2",
    "Under review": "column-3",
    Finished: "column-4",
  };

  const initialAcc: Record<Task["status"], TaskGroup> = {
    "To Do": { status: "To Do", id: "column-1", tasks: [] },
    "In progress": { status: "In progress", id: "column-2", tasks: [] },
    "Under review": { status: "Under review", id: "column-3", tasks: [] },
    Finished: { status: "Finished", id: "column-4", tasks: [] },
  };

  const result = originalData.reduce(
    (acc: Record<Task["status"], TaskGroup>, task) => {
      const { status } = task;

      acc[status].tasks.push({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline,
        userId: task.userId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        id: task.id,
      });

      return acc;
    },
    initialAcc
  );

  return Object.values(result);
}
