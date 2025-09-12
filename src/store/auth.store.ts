// src/store/auth.store.ts
import { create } from "zustand";
import { login, logout, signUp, isAuthenticated } from "../services/auth.service";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  error: string | null;
  loginUser: (username: string, password: string) => void;
  registerUser: (username: string, password: string) => void;
  logoutUser: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: isAuthenticated(),
  token: localStorage.getItem("token"),
  error: null,

  loginUser: (username, password) => {
    const res = login(username, password);
    if (res.success) {
      set({ isLoggedIn: true, token: res.token, error: null });
    } else {
      set({ error: res.error });
    }
  },

  registerUser: (username, password) => {
    const res = signUp(username, password);
    if (res.success) {
      set({ error: null });
    } else {
      set({ error: "Sign-up failed" });
    }
  },

  logoutUser: () => {
    logout();
    set({ isLoggedIn: false, token: null });
  },

  checkAuth: () => {
    set({ isLoggedIn: isAuthenticated(), token: localStorage.getItem("token") });
  },
}));
