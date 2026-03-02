import { LogoutButton } from "@/features/auth/components";
import { TaskFilters, TaskForm, TaskList } from "@/features/tasks/components";
import { AppLayout, Header } from "@/shared/layout";
import styles from "@/pages/DashboardPage/styles.module.css";

export const DashboardPage = () => {
  return (
    <AppLayout
      header={
        <Header
          title="Dashboard"
          subtitle="Manage your tasks with filters and status updates."
          actions={<LogoutButton />}
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
