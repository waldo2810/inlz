"use server";

import { cookies } from "next/headers";
import { schema } from "../schema";
import * as z from "zod";
import { revalidatePath } from "next/cache";

export async function createTask(
  data: z.infer<typeof schema>,
  projectId: string
) {
  const token = cookies().get(
    process.env.NEXT_PUBLIC_TOKEN_NAME as string
  )?.value;
  if (!token) {
    const error: ApiResponseError = {
      message: "Unauthorized",
      statusCode: 401,
      error: "",
    };
    return error;
  }

  const res = await fetch(
    `http://localhost:8080/tasks?projectId=${projectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    return error as ApiResponseError;
  }

  revalidatePath("/projects");
  return (await res.json()) as CreateProjectResponse;
}
