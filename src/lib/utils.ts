import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformData(originalData: OriginalTask[]): TaskGroup[] {
  const statusMap: Record<OriginalTask["status"], TaskGroup["id"]> = {
    "To Do": "column-1",
    "In progress": "column-2",
    "Under review": "column-3",
    Finished: "column-4",
  };

  // Initialize the accumulator with all statuses
  const initialAcc: Record<OriginalTask["status"], TaskGroup> = {
    "To Do": { status: "To Do", id: "column-1", tasks: [] },
    "In progress": { status: "In progress", id: "column-2", tasks: [] },
    "Under review": { status: "Under review", id: "column-3", tasks: [] },
    Finished: { status: "Finished", id: "column-4", tasks: [] },
  };

  const result = originalData.reduce(
    (acc: Record<OriginalTask["status"], TaskGroup>, task) => {
      const { status } = task;

      acc[status].tasks.push({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline,
        user: task.user,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        id: task._id,
      });

      return acc;
    },
    initialAcc
  );

  return Object.values(result);
}
