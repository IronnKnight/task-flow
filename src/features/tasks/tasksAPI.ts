import { delay } from "@/shared/utils/delay";
import type { CreateTaskPayload, Task, UpdateTaskPayload } from "@/features/tasks/types";

const STORAGE_KEY = "task-flow-tasks";

const readTasksFromStorage = (): Task[] => {
  const rawTasks = localStorage.getItem(STORAGE_KEY);

  if (!rawTasks) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawTasks) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

const writeTasksToStorage = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const fetchTasksRequest = async (): Promise<Task[]> => {
  await delay(350);
  return readTasksFromStorage();
};

export const createTaskRequest = async (payload: CreateTaskPayload): Promise<Task> => {
  await delay(350);

  const title = payload.title.trim();

  if (!title) {
    throw new Error("Task title is required.");
  }

  const now = new Date().toISOString();
  const tasks = readTasksFromStorage();

  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    description: payload.description?.trim() ?? "",
    status: payload.status ?? "todo",
    createdAt: now,
    updatedAt: now,
  };

  writeTasksToStorage([newTask, ...tasks]);

  return newTask;
};

export const updateTaskRequest = async (payload: UpdateTaskPayload): Promise<Task> => {
  await delay(350);

  const tasks = readTasksFromStorage();
  const taskIndex = tasks.findIndex((task) => task.id === payload.id);

  if (taskIndex < 0) {
    throw new Error("Task not found.");
  }

  const existingTask = tasks[taskIndex];
  const nextTitle = payload.changes.title?.trim();

  if (payload.changes.title !== undefined && !nextTitle) {
    throw new Error("Task title is required.");
  }

  const updatedTask: Task = {
    ...existingTask,
    ...payload.changes,
    title: nextTitle ?? existingTask.title,
    description: payload.changes.description?.trim() ?? existingTask.description,
    updatedAt: new Date().toISOString(),
  };

  tasks[taskIndex] = updatedTask;
  writeTasksToStorage(tasks);

  return updatedTask;
};

export const deleteTaskRequest = async (taskId: string): Promise<string> => {
  await delay(300);

  const tasks = readTasksFromStorage();
  const filteredTasks = tasks.filter((task) => task.id !== taskId);

  if (filteredTasks.length === tasks.length) {
    throw new Error("Task not found.");
  }

  writeTasksToStorage(filteredTasks);

  return taskId;
};
