import React, {useCallback, useEffect, useState} from 'react';

// import Swiper core and required modules
import {A11y, Scrollbar} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

import {searchProductsByCategoryIdQuery} from "../../gql/category-products.gql";
import {categoryTreeQuery} from "../../gql/category-tree.gql";

const PRODUCTS_LIMIT = 5;

export const CategoryProducts = (props) => {
    const [isInitialized, setInitialized] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);

    const init = useCallback(async () => {
        setLoading(true);
        try {
            const categories = await categoryTreeQuery(props.token);
            const notEmptyCategories = categories.filter((category) => category.productCount > 0);
            if (notEmptyCategories.length === 0) {
                return;
            }
            setCategories(notEmptyCategories);
            const [initialCategory] = notEmptyCategories;
            const products = await searchProductsByCategoryIdQuery(props.token, {
                categoryEntityId: initialCategory.entityId,
                count: PRODUCTS_LIMIT
            });
            setSelectedCategory(initialCategory);
            setProducts(products);
            setInitialized(true);
        } finally {
            setLoading(false);
        }
    }, [isLoading]);

    const loadProductsByCategory = useCallback(async (categoryEntityId) => {
        if (isLoading) {
            return;
        }
        setLoading(true);
        try {
            const products = await searchProductsByCategoryIdQuery(props.token, {
                categoryEntityId: categoryEntityId,
                count: PRODUCTS_LIMIT
            });
            setSelectedCategory(selectedCategory);
            setProducts(products);
        } finally {
            setLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        void init();
    }, []);

    if (isLoading && !isInitialized) {
        return 'Loading...'
    }

    if (!isLoading && !isInitialized) {
        return 'Error...';
    }

    if (categories.length === 0) {
        return 'Empty';
    }

    return (
        <div className="categoryProducts">
            <div className="categoryProducts-categories">
                {categories.map((it) => (
                    <div
                        key={it.entityId}
                        className="categoryProducts-categoriesItem"
                        onClick={() => loadProductsByCategory(it.entityId)}
                    >
                        {it.name}
                    </div>
                ))}
            </div>
            {products.length > 0 ? <Swiper
                wrapperClass="categoryProducts-slider"
                modules={[Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={props.slideCount}
                scrollbar={{draggable: true}}
            >
                {products.map(product => (
                    <SwiperSlide key={product.id} className="categoryProducts-sliderSlide">
                        <div className="categoryProducts-sliderItemBody">
                            {product.defaultImage && (
                                <img
                                    className="categoryProducts-sliderItemPreview"
                                    src={product.defaultImage.urlOriginal}
                                    alt={product.defaultImage.altText}
                                />
                            )}
                        </div>
                        <div className="categoryProducts-sliderItemBody">
                            <h6 className="categoryProducts-sliderItemTitle">
                                {product.name}
                            </h6>
                            <div className="categoryProducts-sliderItemDetails">
                                {product.weight && (
                                    <span className="categoryProducts-sliderItemDetailsTag">
                                        <b>{product.prices.price.value}{product.prices.price.currencyCode}</b>
                                    </span>
                                )}
                                {product.width && product.height && (
                                    <span className="categoryProducts-sliderItemDetailsTag">
                                       {product.width.value}{product.width.unit}x{product.height.value}{product.height.unit}
                                    </span>
                                )}
                                {product.weight && (
                                    <span className="categoryProducts-sliderItemDetailsTag">
                                        {product.weight.value}{product.weight.unit}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="categoryProducts-sliderItemActions">
                            <a href={product.addToCartUrl} className="categoryProducts-sliderItemActionsLink">
                                <button className="categoryProducts-sliderItemActionsButton">
                                    Buy
                                </button>
                            </a>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper> : 'Not Found'}
        </div>
    );
};
