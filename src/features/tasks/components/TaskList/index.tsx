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
import styles from "@/features/tasks/components/TaskList/styles.module.css";

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
    return <Spinner label="Loading tasks..." className={styles.info} />;
  }

  if (status === "error" && tasks.length === 0) {
    return (
      <p role="alert" className={styles.error}>
        {error ?? "Failed to load tasks."}
      </p>
    );
  }

  if (tasks.length === 0) {
    return (
      <p className={styles.info}>No tasks found for the selected filter.</p>
    );
  }

  return (
    <section className={styles.list}>
      {error ? (
        <p role="alert" className={styles.error}>
          {error ?? "Some task actions failed."}
        </p>
      ) : null}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
};
