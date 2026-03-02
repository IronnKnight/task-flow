import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  createTask,
  selectTasksError,
  selectTasksStatus,
} from "@/features/tasks/tasksSlice";
import { Button, Input } from "@/shared/components";

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectTasksStatus);
  const error = useAppSelector(selectTasksError);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isSubmitting = status === "loading";

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        createTask({
          title,
          description,
        }),
      ).unwrap();

      setTitle("");
      setDescription("");
    } catch {
      // Error state is surfaced from Redux via selectTasksError.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-title">Title</label>
      <Input
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Task title"
      />

      <label htmlFor="task-description">Description</label>
      <textarea
        id="task-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Optional task details"
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding task..." : "Add task"}
      </Button>

      {status === "error" && error ? <p role="alert">{error}</p> : null}
    </form>
  );
};
