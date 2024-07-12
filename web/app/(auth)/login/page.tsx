import LoginForm from "./components/login-form";

export default function Login() {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <h3 className="font-semibold text-xl">Log into your account</h3>
      <LoginForm />
    </div>
  );
}
