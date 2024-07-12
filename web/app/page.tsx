import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Index() {
  const session: any = useUser();

  if (!session.user) {
    redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Projects & Tasks</h1>
      <p>Welcome back, {session.user.name}.</p>
      <Link
        href="/home"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Go to home
      </Link>
    </main>
  );
}
