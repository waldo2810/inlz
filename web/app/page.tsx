import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Index() {
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
