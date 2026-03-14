import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

const ADMIN_CREDENTIALS = {
  login: "admin",
  password: "admin123",
};

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("qatnov-admin") === "true");

  const value = useMemo(
    () => ({
      isAdmin,
      login: (login, password) => {
        const success =
          login === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password;

        if (success) {
          localStorage.setItem("qatnov-admin", "true");
          setIsAdmin(true);
        }

        return success;
      },
      logout: () => {
        localStorage.removeItem("qatnov-admin");
        setIsAdmin(false);
      },
    }),
    [isAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
