import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchTasks,
  selectFilteredTasks,
  selectTasksError,
  selectTasksStatus,
} from "@/features/tasks/tasksSlice";
import { TaskCard } from "@/features/tasks/components/TaskCard";

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectTasksStatus);
  const error = useAppSelector(selectTasksError);
  const tasks = useAppSelector(selectFilteredTasks);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  if (status === "loading" && tasks.length === 0) {
    return <p>Loading tasks...</p>;
  }

  if (status === "error") {
    return <p role="alert">{error ?? "Failed to load tasks."}</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks found for the selected filter.</p>;
  }

  return (
    <section>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
};
