"use client";

import React, { useEffect, useState } from "react";
import LeftMenu from "../icons/left-menu";
import TaskCard from "../card/task-card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSession } from "next-auth/react";
import { transformData } from "@/lib/utils";

type Props = {
  user: any;
};

// const initialColumns: Column[] = [
//   {
//     id: "column-1",
//     title: "To Do",
//     tasks: [
//       {
//         id: "task-1",
//         title: "Task 1",
//         description:
//           "Develop and integrate user authentication using email and password.",
//         priority: "urgent",
//       },
//       {
//         id: "task-2",
//         title: "Task 1",
//         description:
//           "Develop and integrate user authentication using email and password.",
//         priority: "low",
//       },
//       {
//         id: "task-3",
//         title: "Task 1",
//         description:
//           "Develop and integrate user authentication using email and password.",
//         priority: "medium",
//       },
//     ],
//   },
//   {
//     id: "column-2",
//     title: "In progress",
//     tasks: [
//       {
//         id: "task-4",
//         title: "Task priii",
//         description:
//           "Develop and integrate user authentication using email and password.",
//         priority: "urgent",
//       },
//       {
//         id: "task-5",
//         title: "Task Success",
//         description:
//           "Develop and integrate user authentication using email and password.",
//         priority: "low",
//       },
//       {
//         id: "task-6",
//         title: "Task Random",
//         description:
//           "Develop and integrate user authentication using email and password.",
//         priority: "medium",
//       },
//     ],
//   },
//   {
//     id: "column-3",
//     title: "Under review",
//     tasks: [
//       {
//         id: "task-7",
//         title: "Task seven",
//         description:
//           "Develop and integrate user authentication using email and password.",
//         priority: "urgent",
//       },
//     ],
//   },
//   {
//     id: "column-4",
//     title: "Finished",
//     tasks: [
//       {
//         id: "task-8",
//         title: "Task seven",
//         description:
//           "Develop and integrate user authentication using email and password.",
//         priority: "urgent",
//       },
//     ],
//   },
// ];

const Tasks = ({ user }: Props) => {
  const [columns, setColumns] = useState<TaskGroup[]>();
  const session = useSession();
  console.log(session, "session");

  const onDragEnd = async (result: any) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns?.find(
        (col) => col.id === source.droppableId
      );
      const destColumn = columns?.find(
        (col) => col.id === destination.droppableId
      );
      const sourceItems = [...sourceColumn!.tasks];
      const destItems = [...destColumn!.tasks];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      // Get the title of the moved task
      setColumns(
        columns?.map((col) => {
          if (col.id === source.droppableId) {
            return { ...col, tasks: sourceItems };
          }
          if (col.id === destination.droppableId) {
            return { ...col, tasks: destItems };
          }
          return col;
        })
      );
      const movedTaskID = removed.id;
      // await api.patch(
      //   `/tasks/${movedTaskID}`,
      //   { status: destColumn!.status },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${session.data?.user?.image}`,
      //     },
      //   }
      // );
    } else {
      const column = columns?.find((col) => col.id === source.droppableId);
      const copiedItems = [...column!.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      // Get the title of the reordered task
      const reorderedTaskTitle = removed.title;
      console.log(
        `Task "${reorderedTaskTitle}" reordered within ${column!.status}`
      );

      setColumns(
        columns?.map((col) => {
          if (col.id === source.droppableId) {
            return { ...col, tasks: copiedItems };
          }
          return col;
        })
      );
    }
  };
  useEffect(() => {
    async function getTask() {
      if (session.data?.user?.image) {
        localStorage.setItem("token", session.data?.user?.image as string);
      }
      let token = localStorage.getItem("token");
      // const response = await api.get("/tasks", {
      //   headers: {
      //     Authorization: `Bearer ${token || session.data?.user?.image}`,
      //   },
      // });
      // let data = transformData(response.data as OriginalTask[]);
      // setColumns(data);
    }
    getTask();
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-[55%] bg-white rounded-lg flex w-[100%] min-w-[100%] p-4 pt-0 relative gap-4 overflow-scroll ">
        {columns?.map((column) => {
          return (
            <div className="w-[24%] min-w-[240px] " key={column.id}>
              <div className="flex justify-between sticky top-[-8px] bg-white py-3 ">
                <span> {column.status} </span>
                <LeftMenu />
              </div>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className=" flex flex-col gap-3 h-[90%] overflow-scroll "
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              priority={task.priority as Priority}
                              key={index}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Tasks;

{
  /* <div className="min-h-[55%] bg-white rounded-lg flex w-full p-4 pt-0 overflow-hidden relative gap-4 ">
  {taskColumns.map((column, key) => {
    return (
      <div className=" w-[24%]" key={key}>
        <div className="flex justify-between sticky top-[-8px] bg-white py-3 ">
          <span> {column.name} </span>
          <LeftMenu />
        </div>
        <div className=" flex flex-col gap-3 h-[90%] overflow-scroll ">
          {column.tasks.map((priority, key) => {
            return <TaskCard priority={priority as Priority} key={key} />;
          })}
        </div>
      </div>
    );
  })}
</div>; */
}
