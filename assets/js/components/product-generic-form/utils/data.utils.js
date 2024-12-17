export const buildSku = (parts) => {
    const allPartsAvailable = parts.filter(it => !!it).length === parts.length;
    return allPartsAvailable ? parts.join('-') : null;
}

export const skuFieldsPredicate = it => it.type === 'select' && it.required === true;

export const combineNamesAndValues = (names, values) => {
    return names.map(name => ({[name]: values[names.indexOf(name)]})).reduce((map, pair) => ({...map, ...pair}), {});
}

// TODO can provide combined price
export const findPrice = (fieldsSettings, pricesSettings, fieldsValueMap) => {
    if (pricesSettings.length === 0) {
        return 0;
    }

    const cleanedFieldsValueMap = {};

    for (const key of Object.keys(fieldsValueMap)) {
        const value = fieldsValueMap[key];

        if (!value) {
            continue;
        }

        cleanedFieldsValueMap[key] = value;
    }

    const skuPriceConfigurationKeys = fieldsSettings.filter(skuFieldsPredicate).map(it => it.name);
    const providedSkuFieldsValues = Object.keys(cleanedFieldsValueMap)
        .filter(key => skuPriceConfigurationKeys.includes(key));

    if (skuPriceConfigurationKeys.length !== providedSkuFieldsValues.length) {
        return null;
    }

    let validPricesSettings = pricesSettings;

    for (const priceConfigurationKey of skuPriceConfigurationKeys) {
        validPricesSettings = validPricesSettings
            .filter(it => it[priceConfigurationKey] === cleanedFieldsValueMap[priceConfigurationKey]);
    }

    const [priceSetting] = validPricesSettings;

    return priceSetting.price;
};
