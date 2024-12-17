import {z} from "zod";

export const zodAliases = {
    notEmptyString: z.string().trim().min(1),
    positiveNumber: z.number().nonnegative(),
}
