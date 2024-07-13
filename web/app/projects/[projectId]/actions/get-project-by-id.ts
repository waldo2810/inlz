"use server";

import { cookies } from "next/headers";

export async function getProjectById(id: string) {
  const token = cookies().get(
    process.env.NEXT_PUBLIC_TOKEN_NAME as string
  )?.value;
  const res = await fetch(`http://localhost:8080/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}
