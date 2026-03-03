import { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";

export const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <>
      {isLoginView ? <LoginForm /> : <RegisterForm />}

      <button
        onClick={() => setIsLoginView(!isLoginView)}
        className="mt-6 text-sm font-medium text-content-muted hover:text-primary transition-colors focus:outline-none"
      >
        {isLoginView
          ? "Don't have an account? Sign up here."
          : "Already have an account? Sign in here."}
      </button>
    </>
  );
};
