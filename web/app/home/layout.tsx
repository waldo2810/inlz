import { cookies } from "next/headers";
import SignOutButton from "./components/sign-out-button";
import { redirect } from "next/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get(
    process.env.NEXT_PUBLIC_TOKEN_NAME as string
  )?.value;
  if (!token) redirect("/login");
  return (
    <div className="w-[90%] md:w-[60%] mx-auto">
      <nav className="flex items-center justify-between py-5">
        <h4 className="text-sm">Projects & Tasks</h4>
        <SignOutButton />
      </nav>
      {children}
    </div>
  );
}
