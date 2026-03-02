export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskPayload = {
  title: string;
  description?: string;
  status?: TaskStatus;
};

export type UpdateTaskPayload = {
  id: string;
  changes: Partial<Pick<Task, "title" | "description" | "status">>;
};

export type TasksFilter = "all" | TaskStatus;

export type TasksStateMeta = {
  status: "idle" | "loading" | "succeeded" | "error";
  createStatus: "idle" | "loading" | "succeeded" | "error";
  error: string | null;
  filter: TasksFilter;
  updatingTaskIds: string[];
  deletingTaskIds: string[];
};
