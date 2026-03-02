import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  createTask,
  selectCreateTaskStatus,
  selectTasksError,
} from "@/features/tasks/tasksSlice";
import { Button, Input } from "@/shared/components";
import styles from "@/features/tasks/components/TaskForm/styles.module.css";

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const createStatus = useAppSelector(selectCreateTaskStatus);
  const error = useAppSelector(selectTasksError);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isSubmitting = createStatus === "loading";

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const resultAction = await dispatch(
      createTask({
        title,
        description,
      }),
    );

    if (createTask.fulfilled.match(resultAction)) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="task-title" className={styles.label}>
        Title
      </label>
      <Input
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Task title"
      />

      <label htmlFor="task-description" className={styles.label}>
        Description
      </label>
      <textarea
        id="task-description"
        className={styles.textarea}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Optional task details"
      />

      <Button type="submit" disabled={isSubmitting} className={styles.submit}>
        {isSubmitting ? "Adding task..." : "Add task"}
      </Button>

      {createStatus === "error" && error ? (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}
    </form>
  );
};
