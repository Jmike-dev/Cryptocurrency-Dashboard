// src/services/auth.service.ts
export interface User {
  username: string;
  password: string;
}

const STORAGE_KEY = "crypto_auth";

export function signUp(username: string, password: string) {
  const user: User = { username, password };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return { success: true };
}

export function login(username: string, password: string) {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { success: false, error: "User not found" };

  const user: User = JSON.parse(stored);
  if (user.username === username && user.password === password) {
    localStorage.setItem("token", "mock-jwt-token");
    return { success: true, token: "mock-jwt-token" };
  }
  return { success: false, error: "Invalid credentials" };
}

export function logout() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
