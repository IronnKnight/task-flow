import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createTask, selectTasksStatus } from "@/features/tasks/tasksSlice";

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectTasksStatus);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isSubmitting = status === "loading";

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await dispatch(
      createTask({
        title,
        description,
      }),
    );

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-title">Title</label>
      <input
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

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding task..." : "Add task"}
      </button>
    </form>
  );
};
