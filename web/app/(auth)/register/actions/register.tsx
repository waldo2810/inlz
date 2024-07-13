"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";
import { schema } from "../schema";

export async function registerUser(userData: z.infer<typeof schema>) {
  const res = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json();
    return error as ApiResponseError;
  }
  const data: RegisterUserResponse = await res.json();
  const access_token = data.access_token;

  cookies().set("access_token", access_token);
  redirect("/");
}
