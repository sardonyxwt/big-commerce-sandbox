import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {FieldsSchema} from "./schema/fields.schema";
import {createPriceSchemas} from "./schema/prices.schema";
import {EnabledSchema} from "./schema/enabled.schema";
import {buildSku, combineNamesAndValues, findPrice, skuFieldsPredicate} from "./utils/data.utils";
import {Badge, Box, Button, Form, Input, Select, Textarea} from "@bigcommerce/big-design";

export const ProductGenericForm = (props) => {
    const {productFieldsMetadata, productPricesMetadata, productEnabledMetadata} = props;

    const [fieldsSettings, setFieldsSettings] = useState([]);
    const [pricesSettings, setPricesSettings] = useState([]);
    const [enabled, setEnabled] = useState(false);
    const [parsingError, setParsingError] = useState();

    const skuFieldsNames = useMemo(() => fieldsSettings.filter(skuFieldsPredicate).map(it => it.name), [fieldsSettings]);
    const selectFieldsNames = useMemo(() => fieldsSettings.filter(it => it.type === 'select').map(it => it.name), [fieldsSettings]);

    const {watch, getValues, handleSubmit, control} = useForm();

    const skuFieldsValues = watch(skuFieldsNames);
    const priceFieldsValues = watch(selectFieldsNames);

    const sku = useMemo(() => buildSku(skuFieldsValues), [skuFieldsValues]);
    const price = useMemo(() => findPrice(fieldsSettings, pricesSettings, combineNamesAndValues(selectFieldsNames, priceFieldsValues)), [fieldsSettings, pricesSettings, priceFieldsValues]);

    const isFieldActive = useCallback((field) => {
        if (!field) {
            return false;
        }

        if (!field.dependsOn) {
            return true;
        }

        const dependsOnFieldValue = getValues(field.dependsOn.field);

        return dependsOnFieldValue === field.dependsOn.value;
    }, [fieldsSettings]);

    const onSubmit = (state) => {
        alert(JSON.stringify(state));
    }

    useEffect(() => {
        try {
            const parsedProductFieldsMetadata = FieldsSchema.parse(productFieldsMetadata);

            const {PricesSchema} = createPriceSchemas(parsedProductFieldsMetadata);

            const parsedProductPricesMetadata = PricesSchema.parse(productPricesMetadata);
            const parsedProductEnabledMetadata = EnabledSchema.parse(productEnabledMetadata);

            setFieldsSettings(parsedProductFieldsMetadata);
            setPricesSettings(parsedProductPricesMetadata);
            setEnabled(parsedProductEnabledMetadata);
        } catch (err) {
            setParsingError(err);
        }
    }, [productFieldsMetadata, productPricesMetadata, productEnabledMetadata]);

    if (parsingError) {
        return <>Error: {JSON.stringify(parsingError)}</>
    }

    if (!enabled) {
        return null;
    }

    return (
        <div>

            <Box display='flex'>
                <Badge marginRight="small" label={`SKU: ${sku ? sku : '-'}`} variant="success"/>
                <Badge label={`Price: ${price ? `${price}$` : '-'}`} variant="success"/>
            </Box>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {fieldsSettings.map((field) => isFieldActive(field) ? (
                    <Fragment key={field.name}>
                        {(
                            field.type === 'select' ? (
                                <Controller
                                    name={field.name}
                                    control={control}
                                    shouldUnregister
                                    render={(controller) => (
                                        <Select
                                            key={field.name}
                                            label={field.label}
                                            required={field.required}
                                            options={field.options.map(({value, label}) => (
                                                {value, content: label}
                                            ))}
                                            value={controller.field.value}
                                            onBlur={controller.field.onBlur}
                                            onOptionChange={controller.field.onChange}
                                            error={controller.fieldState.error?.message}
                                        />
                                    )}
                                />
                            ) : field.type === 'text' ? (
                                <Controller
                                    name={field.name}
                                    control={control}
                                    shouldUnregister
                                    render={(controller) => (
                                        <Input
                                            key={field.name}
                                            label={field.label}
                                            required={field.required}
                                            minLength={field.minLength}
                                            maxLength={field.maxLength}
                                            error={controller.fieldState.error?.message}
                                        />
                                    )}
                                />
                            ) : field.type === 'textarea' ? (
                                <Controller
                                    name={field.name}
                                    control={control}
                                    shouldUnregister
                                    render={(controller) => (
                                        <Textarea
                                            key={field.name}
                                            label={field.label}
                                            required={field.required}
                                            minLength={field.minLength}
                                            maxLength={field.maxLength}
                                            error={controller.fieldState.error?.message}
                                        />
                                    )}
                                />
                            ) : null
                        )}
                    </Fragment>
                ) : null)}
                <Button marginTop="small" type="submit" actionType="normal" variant="primary">Submit</Button>
            </Form>
        </div>
    );
};
