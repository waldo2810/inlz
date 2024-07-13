import * as z from "zod";

export const schema = z.object({
  email: z.string().min(1, { message: "Required" }),
  password: z.string().min(8, { message: "Required" }),
});
