import * as z from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "This is required" }),
  description: z.string().optional(),
});