import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  createTaskRequest,
  deleteTaskRequest,
  fetchTasksRequest,
  updateTaskRequest,
} from "@/features/tasks/tasksAPI";
import type {
  CreateTaskPayload,
  Task,
  TasksFilter,
  TasksStateMeta,
  UpdateTaskPayload,
} from "@/features/tasks/types";
import type { RootState } from "@/app/store";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = tasksAdapter.getInitialState<TasksStateMeta>({
  status: "idle",
  createStatus: "idle",
  fetchError: null,
  createError: null,
  mutationError: null,
  filter: "all",
  updatingTaskIds: [],
  deletingTaskIds: [],
});

export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetchTasks", async () => {
  return fetchTasksRequest();
});

export const createTask = createAsyncThunk<Task, CreateTaskPayload>(
  "tasks/createTask",
  async (payload) => {
    return createTaskRequest(payload);
  },
);

export const updateTask = createAsyncThunk<Task, UpdateTaskPayload>(
  "tasks/updateTask",
  async (payload) => {
    return updateTaskRequest(payload);
  },
);

export const deleteTask = createAsyncThunk<string, string>("tasks/deleteTask", async (taskId) => {
  return deleteTaskRequest(taskId);
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasksFilter: (state, action: PayloadAction<TasksFilter>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.fetchError = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        tasksAdapter.setAll(state, action.payload);
        state.status = "succeeded";
        state.fetchError = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "error";
        state.fetchError = getErrorMessage(action.error, "Unexpected tasks error");
      })
      .addCase(createTask.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action.payload);
        state.createStatus = "succeeded";
        state.createError = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createStatus = "error";
        state.createError = getErrorMessage(action.error, "Unexpected tasks error");
      })
      .addCase(updateTask.pending, (state, action) => {
        const taskId = action.meta.arg.id;
        if (!state.updatingTaskIds.includes(taskId)) {
          state.updatingTaskIds.push(taskId);
        }
        state.mutationError = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        tasksAdapter.upsertOne(state, action.payload);
        state.updatingTaskIds = state.updatingTaskIds.filter(
          (taskId) => taskId !== action.payload.id,
        );
        state.mutationError = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updatingTaskIds = state.updatingTaskIds.filter(
          (taskId) => taskId !== action.meta.arg.id,
        );
        state.mutationError = getErrorMessage(action.error, "Unexpected tasks error");
      })
      .addCase(deleteTask.pending, (state, action) => {
        const taskId = action.meta.arg;
        if (!state.deletingTaskIds.includes(taskId)) {
          state.deletingTaskIds.push(taskId);
        }
        state.mutationError = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        tasksAdapter.removeOne(state, action.payload);
        state.deletingTaskIds = state.deletingTaskIds.filter(
          (taskId) => taskId !== action.payload,
        );
        state.mutationError = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deletingTaskIds = state.deletingTaskIds.filter(
          (taskId) => taskId !== action.meta.arg,
        );
        state.mutationError = getErrorMessage(action.error, "Unexpected tasks error");
      });
  },
});

const tasksSelectors = tasksAdapter.getSelectors<RootState>((state) => state.tasks);

export const selectAllTasks = tasksSelectors.selectAll;
export const selectTasksStatus = (state: RootState): TasksStateMeta["status"] => state.tasks.status;
export const selectCreateTaskStatus = (state: RootState): TasksStateMeta["createStatus"] =>
  state.tasks.createStatus;
export const selectTasksFetchError = (state: RootState): string | null => state.tasks.fetchError;
export const selectCreateTaskError = (state: RootState): string | null => state.tasks.createError;
export const selectTasksMutationError = (state: RootState): string | null =>
  state.tasks.mutationError;
export const selectTasksFilter = (state: RootState): TasksFilter => state.tasks.filter;
export const selectIsTaskUpdating = (state: RootState, taskId: string): boolean =>
  state.tasks.updatingTaskIds.includes(taskId);
export const selectIsTaskDeleting = (state: RootState, taskId: string): boolean =>
  state.tasks.deletingTaskIds.includes(taskId);
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectTasksFilter],
  (tasks, filter) => {
    if (filter === "all") {
      return tasks;
    }

    return tasks.filter((task) => task.status === filter);
  },
);

export const { setTasksFilter } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
