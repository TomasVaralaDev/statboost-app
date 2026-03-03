import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Näytetään latausruutu, kun Firebasen tilaa vielä selvitetään
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base">
        <p className="text-xl font-bold text-primary animate-pulse">
          Ladataan...
        </p>
      </div>
    );
  }

  // Jos käyttäjää ei ole, ohjataan login-sivulle.
  // Replace-määre estää käyttäjää palaamasta back-napilla suojattuun reittiin.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jos käyttäjä on olemassa, renderöidään lapsireitit (Outlet)
  return <Outlet />;
};
