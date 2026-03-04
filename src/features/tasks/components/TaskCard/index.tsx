import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  deleteTask,
  selectIsTaskDeleting,
  selectIsTaskUpdating,
  updateTask,
} from "@/features/tasks/tasksSlice";
import type { Task, TaskStatus } from "@/features/tasks/types";
import { Button } from "@/shared/components";
import styles from "@/features/tasks/components/TaskCard/styles.module.css";

type TaskCardProps = {
  task: Task;
};

const STATUS_OPTIONS: TaskStatus[] = ["todo", "in-progress", "done"];

export const TaskCard = ({ task }: TaskCardProps) => {
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector((state) => selectIsTaskUpdating(state, task.id));
  const isDeleting = useAppSelector((state) => selectIsTaskDeleting(state, task.id));

  const handleStatusChange = async (nextStatus: TaskStatus) => {
    await dispatch(
      updateTask({
        id: task.id,
        changes: { status: nextStatus },
      }),
    );
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(task.id));
  };

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.description}>
        {task.description || "No description"}
      </p>

      <label htmlFor={`task-status-${task.id}`} className={styles.label}>
        Status
      </label>
      <div className={styles.selectContainer}>
        <select
          id={`task-status-${task.id}`}
          className={styles.select}
          value={task.status}
          disabled={isUpdating || isDeleting}
          onChange={(event) =>
            handleStatusChange(event.target.value as TaskStatus)
          }
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <Button
          type="button"
          onClick={handleDelete}
          className={styles.delete}
          disabled={isDeleting || isUpdating}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </article>
  );
};
