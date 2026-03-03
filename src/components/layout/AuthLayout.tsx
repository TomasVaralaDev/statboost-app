import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const AuthLayout = () => {
  const { user, loading } = useAuth();

  // Jos kirjautunut käyttäjä yrittää tulla /login sivulle, heitetään hänet takaisin appiin
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base">
      <h1 className="mb-8 text-5xl font-black italic tracking-widest text-primary uppercase">
        StatBoost
      </h1>
      <Outlet />
    </div>
  );
};
