"use server";

import { cookies } from "next/headers";
import * as z from "zod";
import { schema } from "../schema";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createProject(userData: z.infer<typeof schema>) {
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

  const res = await fetch("http://localhost:8080/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    return error as ApiResponseError;
  }

  revalidatePath("/home");
  return (await res.json()) as CreateProjectResponse;
}
