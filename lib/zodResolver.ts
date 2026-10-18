import { FieldValues, Resolver } from "react-hook-form";

export interface ZodLikeSchema<T> {
  safeParseAsync: (values: unknown) => Promise<
    | { success: true; data: T }
    | {
        success: false;
        error: {
          issues: Array<{
            path?: readonly unknown[] | unknown[];
            code?: unknown;
            message?: string;
          }>;
        };
      }
  >;
}

export function zodResolver<T extends FieldValues>(
  schema: ZodLikeSchema<T>
): Resolver<T> {
  return async (values) => {
    const result = await schema.safeParseAsync(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const pathArray = issue.path || [];
      const field = pathArray.map((p) => String(p)).join(".");
      if (field && !errors[field]) {
        errors[field] = {
          type: String(issue.code || "validation"),
          message: issue.message || "Invalid value",
        };
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { values: {} as any, errors: errors as any };
  };
}
