import { useQuery } from "@tanstack/react-query";
import { telegramLogin } from "@/api/auth";

export function useAuth() {
  const existingToken = localStorage.getItem("auth_token");

  return useQuery({
    queryKey: ["auth"],
    queryFn: telegramLogin,
    staleTime: Infinity,
    retry: false,
    enabled: !existingToken,
  });
}
