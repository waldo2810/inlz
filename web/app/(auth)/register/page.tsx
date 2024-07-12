import RegisterForm from "./components/register-form";

export default function Register() {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <h3 className="font-semibold text-xl">Create an account</h3>
      <RegisterForm />
    </div>
  );
}
