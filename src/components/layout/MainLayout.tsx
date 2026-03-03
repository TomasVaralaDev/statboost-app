import { Outlet, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

export const MainLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Näytetään Display Name, tai jos sitä ei ole, sähköposti
  const displayName = user?.displayName || user?.email;

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <header className="bg-surface border-b border-gray-800 p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-black text-primary uppercase italic tracking-widest cursor-pointer hover:text-primary-hover transition-colors"
          >
            StatBoost
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-content-muted hidden sm:inline-block">
              {displayName}
            </span>

            {/* Settings Button */}
            <button
              onClick={() => navigate("/settings")}
              className="p-2 text-content-muted hover:text-primary transition-colors focus:outline-none"
              title="Settings"
            >
              {/* Yksinkertainen SVG-rataskuvake */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => authService.logout()}
              className="px-4 py-2 text-sm font-bold text-white uppercase transition-colors bg-surface border border-gray-700 rounded-lg hover:border-danger hover:text-danger focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};
