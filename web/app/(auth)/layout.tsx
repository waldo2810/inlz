import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get(process.env.NEXT_PUBLIC_TOKEN_NAME as string);
  if (token) redirect("/");
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
