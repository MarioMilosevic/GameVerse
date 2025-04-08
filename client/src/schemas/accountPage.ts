import z, { ZodError } from "zod";

export const accountSchema = z.object({
  fullName: z
    .string()
    .min(5, {
      message: "Must be at least 5 character(s)",
    })
    .refine(
      (value) => {
        const names = value.trim().split(" ");
        return names.length >= 2 && names[1].length >= 2;
      },
      {
        message: "Last name must have at least 2 characters",
      }
    ),
  email: z.string().email(),
});

export type AccountSchema = z.infer<typeof accountSchema>;

export type AccountFields = keyof AccountSchema;
export type AccountFieldErrors = {
  [key in AccountFields]?: string;
};
export type AccountTouchedFields = {
  [key in AccountFields]?: boolean;
};

export function getAccountFieldError<
  T extends AccountFields,
  K extends AccountSchema[T]
>(property: T, value: K) {
  const { error } = accountSchema.shape[property].safeParse(value);
  return error
    ? error.issues.map((issue) => issue.message).join(", ")
    : undefined;
}

export const getAccountErrors = (error: ZodError) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join("") as keyof AccountSchema;
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {} as AccountFieldErrors);
