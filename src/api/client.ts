const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("auth_token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // Якщо токен протермінував — очищаємо і перезавантажуємо
  if (res.status === 401) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("tg_user");
    // window.location.reload();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
