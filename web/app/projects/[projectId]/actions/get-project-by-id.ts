"use server";

import { cookies } from "next/headers";

export async function getProjectById(id: string) {
  try {
    const token = cookies().get(
      process.env.NEXT_PUBLIC_TOKEN_NAME as string
    )?.value;
    return await fetch(`http://localhost:8080/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
  } catch (e) {
    console.log(e);
  }
}
