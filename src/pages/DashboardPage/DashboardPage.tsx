import { TaskFilters } from "@/features/tasks/components/TaskFilters";
import { TaskForm } from "@/features/tasks/components/TaskForm";
import { TaskList } from "@/features/tasks/components/TaskList";
import { AppLayout } from "@/shared/layout/AppLayout";
import { Header } from "@/shared/layout/Header";
import styles from "@/pages/DashboardPage/DashboardPage.module.css";

export const DashboardPage = () => {
  return (
    <AppLayout
      header={
        <Header
          title="Dashboard"
          subtitle="Manage your tasks with filters and status updates."
        />
      }
    >
      <div className={styles.page}>
        <section className={styles.panel}>
          <TaskForm />
        </section>
        <section className={styles.panel}>
          <TaskFilters />
        </section>
        <section className={styles.panel}>
          <TaskList />
        </section>
      </div>
    </AppLayout>
  );
};
