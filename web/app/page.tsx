import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Index() {
  const token = cookies().get(
    process.env.NEXT_PUBLIC_TOKEN_NAME as string
  )?.value;
  if (!token) redirect("/login");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <h1 className="text-2xl font-bold">Projects & Tasks</h1>
      <p>Welcome back</p>
      <Button variant="ghost">
        <Link href="/home">Go to my projects</Link>
      </Button>
    </main>
  );
}
