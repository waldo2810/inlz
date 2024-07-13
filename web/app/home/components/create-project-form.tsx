"use client";

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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { schema } from "../schema";
import { createProject } from "../actions/create-project";

export default function CreateProjectForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    const response = await createProject(data);
    if ("error" in response) {
      form.setError("root.serverError", {
        type: "custom",
        message: response.message,
      });
    }
  }

  return (
    <>
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
                  <Input placeholder="My project" {...field} />
                </FormControl>
                <FormDescription>Project&apos;s name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="An awesome project" {...field} />
                </FormControl>
                <FormDescription>Project's description.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {form.formState.errors?.root?.serverError.type === "custom" && (
        <p className="py-4 font-semibold text-center text-red-600 text-xs">
          Sorry, {form.formState.errors?.root?.serverError.message}.
        </p>
      )}
    </>
  );
}
