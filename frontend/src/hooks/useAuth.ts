import { create } from "zustand";
import { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => {
  const storedUser = localStorage.getItem("tracex_user");
  const storedToken = localStorage.getItem("tracex_token");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return {
    user,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    isAdmin: user?.role === "ADMIN",
    login: (user: User, token: string) => {
      localStorage.setItem("tracex_user", JSON.stringify(user));
      localStorage.setItem("tracex_token", token);
      set({ user, token, isAuthenticated: true, isAdmin: user.role === "ADMIN" });
    },
    logout: () => {
      localStorage.removeItem("tracex_user");
      localStorage.removeItem("tracex_token");
      set({ user: null, token: null, isAuthenticated: false, isAdmin: false });
    },
  };
});
