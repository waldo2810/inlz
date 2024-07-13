import { cookies } from "next/headers";

export async function getProjects() {
  const token = cookies().get(
    process.env.NEXT_PUBLIC_TOKEN_NAME as string
  )?.value;
  if (!token) {
    return {
      message: "Unauthorized",
      statusCode: 401,
      error: "",
    } as ApiResponseError;
  }
  const res = await fetch("http://localhost:8080/projects", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data as Project[];
}
