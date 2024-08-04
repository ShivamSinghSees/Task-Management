"use client";

import React, { useEffect, useState } from "react";
import LeftMenu from "../icons/left-menu";
import TaskCard from "../card/task-card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSession } from "next-auth/react";
import { transformData } from "@/lib/utils";
import { getTasks, upsertTask } from "@/lib/queries";
import { Session } from "next-auth";
import { CustomSession, TaskGroup } from "@/lib/type";

const Tasks = () => {
  const [columns, setColumns] = useState<TaskGroup[]>();
  const { data: session } = useSession() as { data: CustomSession | null };

  const onDragEnd = async (result: any) => {
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
      await upsertTask({
        id: movedTaskID,
        status: destColumn!.status,
      });
    } else {
      const column = columns?.find((col) => col.id === source.droppableId);
      const copiedItems = [...column!.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      // Get the title of the reordered task
      const reorderedTaskTitle = removed.title;

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
      let tasks = await getTasks(session?.user.id as string);
      if (typeof tasks !== "string") {
        setColumns(tasks);
      }
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
                {(provided) => (
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
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} key={index} />
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
