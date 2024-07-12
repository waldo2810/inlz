"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { schema } from "../schema";
import { loginUser } from "../actions/login";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    const error = await loginUser(data);
    if (error) {
      form.setError("root.serverError", {
        type: "custom",
        message: error.message,
      });
    }
  }

  return (
    <div className="w-3/4 md:w-1/4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="user@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Log in</Button>
        </form>
      </Form>
      {form.formState.errors?.root?.serverError.type === "custom" && (
        <p className="py-4 font-semibold text-center text-red-600 text-xs">
          {form.formState.errors?.root?.serverError.message}!
        </p>
      )}
      <div className="flex flex-col gap-1">
        <span className="text-xs pt-2">Don't have an account yet?</span>
        <Button variant="outline" onClick={() => router.replace("/register")}>
          Create an account
        </Button>
      </div>
    </div>
  );
}
