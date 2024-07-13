import Logo from "../home/components/logo";
import SignOutButton from "../home/components/sign-out-button";

export default function ProjectsLayout({
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
      {children}
    </div>
  );
}
