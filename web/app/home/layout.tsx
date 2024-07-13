import { Suspense } from "react";
import Logo from "./components/logo";
import SignOutButton from "./components/sign-out-button";
import { Spinner } from "@/components/ui/spinner";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[90%] md:w-[60%] mx-auto">
      <nav className="flex items-center justify-between py-5">
        <Logo />
        <SignOutButton />
      </nav>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </div>
  );
}
