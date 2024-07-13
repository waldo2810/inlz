"use server";

import { cookies } from "next/headers";

export async function getProjectTasks(projectId: string) {
  const token = cookies().get(
    process.env.NEXT_PUBLIC_TOKEN_NAME as string
  )?.value;
  const res = await fetch(
    `http://localhost:8080/tasks?projectId=${projectId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await res.json();
}
