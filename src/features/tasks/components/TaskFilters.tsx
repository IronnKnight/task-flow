import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectTasksFilter,
  setTasksFilter,
} from "@/features/tasks/tasksSlice";
import type { TasksFilter } from "@/features/tasks/types";

const FILTER_OPTIONS: TasksFilter[] = ["all", "todo", "in-progress", "done"];

export const TaskFilters = () => {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector(selectTasksFilter);

  return (
    <fieldset>
      <legend>Filter tasks</legend>
      {FILTER_OPTIONS.map((filter) => (
        <label key={filter}>
          <input
            type="radio"
            name="tasks-filter"
            value={filter}
            checked={activeFilter === filter}
            onChange={() => dispatch(setTasksFilter(filter))}
          />
          {filter}
        </label>
      ))}
    </fieldset>
  );
};
