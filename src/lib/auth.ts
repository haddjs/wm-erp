import { db, delay } from "./mock-db";
import type { User } from "@/types/user";
import type {
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";

export type MockUserProfile = {
  id: string;
  email: string;
  name: string;
  role: "Admin" | "General Affairs" | "Finance";
};

const ROLE_NAME: Record<User["role"], MockUserProfile["role"]> = {
  1: "Admin",
  2: "General Affairs",
  3: "Finance",
};

const PRIMARY_USER: Record<User["role"], string> = {
  1: "user-1",
  2: "user-2",
  3: "user-3",
};

const SESSION_KEY = "mock_session_user";

function persistSession(user: User) {
  if (typeof window === "undefined") return;
  localStorage.setItem("access_token", "mock-access-token");
  localStorage.setItem("refresh_token", "mock-refresh-token");
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function readSessionUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

function toProfile(user: User): MockUserProfile {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: ROLE_NAME[user.role],
  };
}

export async function register(
  payload: RegisterPayload,
): Promise<{ data: RegisterResponse }> {
  await delay();
  return {
    data: { user_id: "user-new", email: payload.email, name: payload.name },
  };
}

export async function login(
  payload: LoginPayload,
): Promise<{ data: LoginResponse }> {
  await delay(500);
  const user = db.users.find(
    (u) => u.email.toLowerCase() === payload.email.toLowerCase(),
  );
  if (!user) throw new Error("Invalid email or password");
  persistSession(user);
  return {
    data: {
      access_token: "mock-access-token",
      refresh_token: "mock-refresh-token",
    },
  };
}

export async function logout(): Promise<{ data: null }> {
  await delay();
  clearAuthData();
  return { data: null };
}

export async function refreshToken(): Promise<{ data: RefreshTokenResponse }> {
  await delay();
  return { data: { access_token: "mock-access-token" } };
}

export async function getUserProfile(): Promise<{ data: MockUserProfile }> {
  await delay();
  const user = readSessionUser();
  if (!user) throw new Error("Not authenticated");
  return { data: toProfile(user) };
}

/** Swap the active mock session to a different role (for the demo switcher). */
export async function switchMockRole(
  role: User["role"],
): Promise<{ data: MockUserProfile }> {
  await delay(200);
  const user =
    db.users.find((u) => u.id === PRIMARY_USER[role]) ??
    db.users.find((u) => u.role === role);
  if (!user) throw new Error("No mock user for this role");
  persistSession(user);
  return { data: toProfile(user) };
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("access_token");
  return !!token;
}

export function clearAuthData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem(SESSION_KEY);
}
