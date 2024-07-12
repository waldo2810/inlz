import { getUser } from "@/actions/user/get";

export const useUser = async () => {
  const user = await getUser();
  return { user };
};
