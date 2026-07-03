import { useLaunchParams } from "@telegram-apps/sdk-react";

export function useTgUser() {
  const lp = useLaunchParams();
  const user = lp.tgWebAppData?.user;

  return {
    firstName: String(user?.firstName ?? ""),
    lastName: String(user?.lastName ?? ""),
    id: user?.id ?? null,
  };
}
