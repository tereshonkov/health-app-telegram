const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

let isRefreshing = false;

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  _retry = false,
): Promise<T> {
  const token = localStorage.getItem("auth_token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // Токен невалідний — робимо новий логін і повторюємо запит один раз
  if (res.status === 401 && !_retry && !isRefreshing) {
    console.error("Got 401, attempting relogin...");
    isRefreshing = true;
    try {
      const { telegramLogin } = await import("@/api/auth");
      await telegramLogin();
      console.error("Relogin success, retrying...");
      isRefreshing = false;
      return apiRequest<T>(endpoint, options, true);
    } catch (e) {
      console.error("Relogin failed:", e);
      isRefreshing = false;
      throw e;
    }
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
