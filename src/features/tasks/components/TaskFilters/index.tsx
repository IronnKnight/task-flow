import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectTasksFilter,
  setTasksFilter,
} from "@/features/tasks/tasksSlice";
import type { TasksFilter } from "@/features/tasks/types";
import { Input } from "@/shared/components";
import styles from "@/features/tasks/components/TaskFilters/styles.module.css";

const FILTER_OPTIONS: TasksFilter[] = ["all", "todo", "in-progress", "done"];

export const TaskFilters = () => {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector(selectTasksFilter);

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Filter tasks</legend>
      <div className={styles.options}>
      {FILTER_OPTIONS.map((filter) => (
        <label key={filter} className={styles.option}>
          <Input
            type="radio"
            name="tasks-filter"
            value={filter}
            checked={activeFilter === filter}
            onChange={() => dispatch(setTasksFilter(filter))}
          />
          <span className={styles.optionText}>{filter}</span>
        </label>
      ))}
      </div>
    </fieldset>
  );
};
