import {z} from "zod";
import {zodAliases} from "../utils/zod.utils";
import {skuFieldsPredicate} from "../utils/data.utils";

const baseFieldShape = {
    name: zodAliases.notEmptyString,
    label: zodAliases.notEmptyString,
    required: z.boolean().default(false),
}

const dependsFieldShape = {
    ...baseFieldShape,
    dependsOn: z.object({
        field: zodAliases.notEmptyString,
        value: zodAliases.notEmptyString,
    }).nullish(),
}

const baseTextFieldShape = {
    ...dependsFieldShape,
    minLength: zodAliases.positiveNumber.nullish(),
    maxLength: zodAliases.positiveNumber.nullish(),
}

export const FieldSchema = z.union([
    z.object({
        ...baseFieldShape,
        type: z.literal('select'),
        options: z.object({
            value: zodAliases.notEmptyString,
            label: zodAliases.notEmptyString,
        }).array().min(1),
    }),
    z.object({
        ...baseTextFieldShape,
        type: z.literal('text'),
    }),
    z.object({
        ...baseTextFieldShape,
        type: z.literal('textarea'),
    })
]).superRefine((arg, ctx) => {
    if (arg.type === 'select') {
        const values = arg.options.map(it => it.value);
        const uniqueValues = new Set(values);

        if (values.length !== uniqueValues.size) {
            ctx.addIssue({
                path: ['options'],
                code: z.ZodIssueCode.custom,
                message: `${arg.name} -> options not unique (${values.join(';')})`,
            })
        }
    }
    if (arg.type === 'text' || arg.type === 'textarea') {
        if (typeof arg.minLength === 'number' && typeof arg.maxLength === 'number' && arg.maxLength <= arg.minLength) {
            ctx.addIssue({
                path: ['maxLength'],
                code: z.ZodIssueCode.custom,
                message: `${arg.name} -> maxLength (${arg.maxLength}) must be greater then minLength (${arg.minLength})`,
            })
        }
    }
});

export const FieldsSchema = FieldSchema.array().superRefine((arg, ctx) => {
    const names = arg.map(it => it.name);
    const uniqueNames = new Set(names);

    if (names.length !== uniqueNames.size) {
        ctx.addIssue({
            path: ['options'],
            code: z.ZodIssueCode.custom,
            message: `Fields names not unique (${names.join(';')})`,
        })
    }

    const skuFieldsCount = arg.filter(skuFieldsPredicate).length;

    if (skuFieldsCount === 0) {
        ctx.addIssue({
            path: [0, 'type'],
            code: z.ZodIssueCode.custom,
            message: `Fields required one or more select fields with required true`,
        });
    }

    for (const field of arg) {
        if (field.type === 'select') {
            continue;
        }

        if (field.dependsOn) {
            if (!names.includes(field.dependsOn.field)) {
                ctx.addIssue({
                    path: [arg.indexOf(field), 'dependsOn', 'field'],
                    code: z.ZodIssueCode.custom,
                    message: `Depends on field not exist ${field.dependsOn.field}`,
                });
                break;
            }

            const dependsOnField = arg.find(it => it.name === field.dependsOn.field);

            if (dependsOnField.type !== 'select') {
                ctx.addIssue({
                    path: [arg.indexOf(field), 'dependsOn', 'field'],
                    code: z.ZodIssueCode.custom,
                    message: `Depends on field type is not select (${dependsOnField.type})`,
                });
                break;
            }

            const dependsOnValues = dependsOnField.options.map(it => it.value);

            if (!dependsOnValues.includes(field.dependsOn.value)) {
                ctx.addIssue({
                    path: [arg.indexOf(field), 'dependsOn', 'field'],
                    code: z.ZodIssueCode.custom,
                    message: `Depends on field not contain (${field.dependsOn.value})`,
                });
                break;
            }
        }
    }
});
