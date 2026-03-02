import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchTasks,
  selectFilteredTasks,
  selectTasksError,
  selectTasksStatus,
} from "@/features/tasks/tasksSlice";
import { TaskCard } from "@/features/tasks/components/TaskCard";
import { Spinner } from "@/shared/components";

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
    return <Spinner label="Loading tasks..." />;
  }

  if (status === "error" && tasks.length === 0) {
    return <p role="alert">{error ?? "Failed to load tasks."}</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks found for the selected filter.</p>;
  }

  return (
    <section>
      {status === "error" ? (
        <p role="alert">{error ?? "Some task actions failed."}</p>
      ) : null}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
};
