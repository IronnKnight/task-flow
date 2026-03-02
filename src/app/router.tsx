import { Navigate, createBrowserRouter, RouterProvider } from "react-router";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import { DashboardPage } from "@/pages/DashboardPage/DashboardPage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
