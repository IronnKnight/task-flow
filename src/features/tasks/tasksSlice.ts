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
  error: null,
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
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        tasksAdapter.setAll(state, action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "error";
        state.error = getErrorMessage(action.error, "Unexpected tasks error");
      })
      .addCase(createTask.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action.payload);
        state.createStatus = "succeeded";
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createStatus = "error";
        state.error = getErrorMessage(action.error, "Unexpected tasks error");
      })
      .addCase(updateTask.pending, (state, action) => {
        const taskId = action.meta.arg.id;
        if (!state.updatingTaskIds.includes(taskId)) {
          state.updatingTaskIds.push(taskId);
        }
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        tasksAdapter.upsertOne(state, action.payload);
        state.updatingTaskIds = state.updatingTaskIds.filter(
          (taskId) => taskId !== action.payload.id,
        );
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updatingTaskIds = state.updatingTaskIds.filter(
          (taskId) => taskId !== action.meta.arg.id,
        );
        state.error = getErrorMessage(action.error, "Unexpected tasks error");
      })
      .addCase(deleteTask.pending, (state, action) => {
        const taskId = action.meta.arg;
        if (!state.deletingTaskIds.includes(taskId)) {
          state.deletingTaskIds.push(taskId);
        }
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        tasksAdapter.removeOne(state, action.payload);
        state.deletingTaskIds = state.deletingTaskIds.filter(
          (taskId) => taskId !== action.payload,
        );
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deletingTaskIds = state.deletingTaskIds.filter(
          (taskId) => taskId !== action.meta.arg,
        );
        state.error = getErrorMessage(action.error, "Unexpected tasks error");
      });
  },
});

const tasksSelectors = tasksAdapter.getSelectors<RootState>((state) => state.tasks);

export const selectAllTasks = tasksSelectors.selectAll;
export const selectTaskById = tasksSelectors.selectById;
export const selectTasksIds = tasksSelectors.selectIds;
export const selectTasksStatus = (state: RootState): TasksStateMeta["status"] => state.tasks.status;
export const selectCreateTaskStatus = (state: RootState): TasksStateMeta["createStatus"] =>
  state.tasks.createStatus;
export const selectTasksError = (state: RootState): string | null => state.tasks.error;
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
