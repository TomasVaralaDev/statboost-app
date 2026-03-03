import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../components/layout/MainLayout";
import { AuthLayout } from "../components/layout/AuthLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { AuthPage } from "../pages/AuthPage";
import { CreateWorkoutPage } from "../pages/CreateWorkoutPage";
import { WorkoutDetailPage } from "../pages/WorkoutDetailPage";
import { EditWorkoutPage } from "../pages/EditWorkoutPage";
import { SettingsPage } from "../pages/SettingsPage";
import { CreateProgramPage } from "../pages/CreateProgramPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <AuthPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          { path: "/create-workout", element: <CreateWorkoutPage /> },
          { path: "/workout/:id", element: <WorkoutDetailPage /> },
          { path: "/edit-workout/:id", element: <EditWorkoutPage /> },
          { path: "/settings", element: <SettingsPage /> },
          { path: "/create-program", element: <CreateProgramPage /> },
        ],
      },
    ],
  },
]);
