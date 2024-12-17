import {z} from "zod";
import {zodAliases} from "../utils/zod.utils";
import {skuFieldsPredicate} from "../utils/data.utils";

export const createPriceSchemas = (fields) => {
    const skuFields = fields.filter(skuFieldsPredicate);
    const selectFields = fields.filter(it => it.type === 'select');
    const skuFieldsNames = skuFields.map(it => it.name);
    const selectFieldsNames = selectFields.map(it => it.name);

    const priceFieldsShape = {};

    for (const field of selectFields) {
        const variantsSchema = z.union(field.options.map(it => z.literal(it.value)));
        priceFieldsShape[field.name] = field.required ? variantsSchema : variantsSchema.nullish();
    }

    const PriceSchema = z.object({
        ...priceFieldsShape,
        price: zodAliases.positiveNumber,
    }).superRefine((arg, ctx) => {
        const keys = Object.keys(arg);

        if (keys.length === 1) {
            ctx.addIssue({
                path: [],
                code: z.ZodIssueCode.custom,
                message: `Price need context please add one of ${selectFieldsNames.join(',')}`,
            });
        }
    });

    const PricesSchema = PriceSchema.array().superRefine((arg, ctx) => {
        const ids = [];
        const skuIds = [];

        for (const priceOption of arg) {
            let priceUniqueIdParts = [];
            let priceSkuUniqueIdParts = [];

            for (const fieldName of selectFieldsNames) {
                const value = priceOption[fieldName];
                if (!value) {
                    return;
                }
                priceUniqueIdParts.push(`${fieldName}:${value}`);
            }

            for (const fieldName of skuFieldsNames) {
                const value = priceOption[fieldName];
                if (!value) {
                    return;
                }
                priceSkuUniqueIdParts.push(`${fieldName}:${value}`);
            }

            ids.push(priceUniqueIdParts.join(';'));
            skuIds.push(priceSkuUniqueIdParts.join(';'));
        }

        const uniqueIds = new Set(ids);
        const uniqueSkuIds = new Set(skuIds);

        const skuFieldsOptionsCombinationsCount = skuFields
            .map(it => it.options.length)
            .reduce((result, count) => result === 0 ? count : result * count, 0);

        if (skuFieldsOptionsCombinationsCount !== uniqueSkuIds.size) {
            ctx.addIssue({
                path: [],
                code: z.ZodIssueCode.custom,
                message: `Not all required price combination provided`,
            });
        }

        if (ids.length !== uniqueIds.size) {
            ctx.addIssue({
                path: [],
                code: z.ZodIssueCode.custom,
                message: `Duplicate price configuration`,
            });
        }
    });

    return {PriceSchema, PricesSchema}
}
