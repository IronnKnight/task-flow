import { useAppDispatch } from "@/app/hooks";
import { deleteTask, updateTask } from "@/features/tasks/tasksSlice";
import type { Task, TaskStatus } from "@/features/tasks/types";

type TaskCardProps = {
  task: Task;
};

const STATUS_OPTIONS: TaskStatus[] = ["todo", "in-progress", "done"];

export const TaskCard = ({ task }: TaskCardProps) => {
  const dispatch = useAppDispatch();

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
    <article>
      <h3>{task.title}</h3>
      <p>{task.description || "No description"}</p>

      <label htmlFor={`task-status-${task.id}`}>Status</label>
      <select
        id={`task-status-${task.id}`}
        value={task.status}
        onChange={(event) => handleStatusChange(event.target.value as TaskStatus)}
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
};
