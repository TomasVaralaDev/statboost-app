import { useState } from "react";
import type { FormEvent } from "react";
import { authService } from "../../services/authService";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authService.login(email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-surface rounded-xl shadow-lg shadow-black/50 border border-gray-800">
      <h2 className="text-2xl font-bold text-center text-content">Sign In</h2>

      {error && (
        <div className="p-3 text-sm text-content bg-danger/20 border border-danger/50 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-content-muted">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-base border border-gray-700 rounded-lg text-content focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-600 transition-shadow"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-content-muted">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-base border border-gray-700 rounded-lg text-content focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-600 transition-shadow"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 mt-2 font-bold tracking-wide text-white uppercase transition-colors bg-primary rounded-lg hover:bg-primary-hover focus:outline-none disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
