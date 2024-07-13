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
import { schema } from "../../schema";
import { DatePickerField } from "./fields/datepicker";
import { createTask } from "../../actions/create-task";

type CreateTaskFormProps = {
  project: Project;
};

export function CreateTaskForm({ project }: CreateTaskFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    const response = await createTask(data, project.id);
    if ("error" in response) {
      form.setError("root.serverError", {
        type: "custom",
        message: response.message,
      });
    }
    form.reset();
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Do laundry" {...field} />
                </FormControl>
                <FormDescription>Task&apos;s name.</FormDescription>
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
                  <Input placeholder="Until monday" {...field} />
                </FormControl>
                <FormDescription>Task&apos;s description.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <DatePickerField form={form} />
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