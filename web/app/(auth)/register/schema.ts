import * as z from "zod";

export const schema: z.ZodType<User> = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z.string().min(1, { message: "Required" }),
  password: z.string().min(8, { message: "Required" }),
});
