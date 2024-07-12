"use client";

import { registerUser } from "@/app/(auth)/register/actions/register";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    const error = await registerUser(data);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Snow" {...field} />
                </FormControl>
                <FormDescription>Your name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="user@email.com" {...field} />
                </FormControl>
                <FormDescription>Your email.</FormDescription>
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
                <FormDescription>Your super secure password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {form.formState.errors?.root?.serverError.type === "custom" && (
        <p className="py-4 font-semibold text-center text-red-600 text-xs">
          {form.formState.errors?.root?.serverError.message}!
        </p>
      )}
      <div className="flex flex-col gap-1">
        <span className="text-xs pt-2">Already have an account?</span>
        <Button variant="outline" onClick={() => router.replace("/login")}>
          Log in
        </Button>
      </div>
    </div>
  );
}
