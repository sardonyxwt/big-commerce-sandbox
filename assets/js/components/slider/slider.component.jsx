import React from 'react';

// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const Slider = (props) => {
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide>
                !!!
                {/* {props.products.map((it) => ( */}
                {/*     <div key={it.id}>{it.id}</div> */}
                {/* ))} */}
                {/* <article class="card"> */}
                {/*     <figure class="card-figure"> */}
                {/*         <a href="/able-brewing-system" class="card-figure__link"> */}
                {/*             <div class="card-img-container"> */}
                {/*                 <img */}
                {/*                     src="https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/500x659/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1" */}
                {/*                     alt="[Sample] Able Brewing System" title="[Sample] Able Brewing System" */}
                {/*                     data-sizes="auto" */}
                {/*                     srcset="https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/80w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 80w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/160w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 160w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/320w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 320w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/640w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 640w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/960w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 960w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/1280w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 1280w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/1920w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 1920w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/2560w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 2560w" */}
                {/*                     data-srcset="https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/80w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 80w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/160w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 160w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/320w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 320w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/640w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 640w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/960w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 960w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/1280w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 1280w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/1920w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 1920w, https://cdn11.bigcommerce.com/s-zcjwkdzqqq/images/stencil/2560w/products/86/286/ablebrewingsystem4.1732289716.jpg?c=1 2560w" */}
                {/*                     class="card-image lazyautosizes ls-is-cached lazyloaded" sizes="211px"> */}
                {/*             </div> */}
                {/*         </a> */}

                {/*         <figcaption class="card-figcaption"> */}
                {/*             <div class="card-figcaption-body"> */}
                {/*                 <button type="button" */}
                {/*                         class="button button--small card-figcaption-button quickview">Quick view */}
                {/*                 </button> */}
                {/*                 <a href="/cart.php?action=add&amp;product_id=86" */}
                {/*                    class="button button--small card-figcaption-button">Add to Cart</a> */}
                {/*                 <span */}
                {/*                     class="product-status-message aria-description--hidden">The item has been added</span> */}
                {/*             </div> */}
                {/*         </figcaption> */}
                {/*     </figure> */}
                {/*     <div class="card-body"> */}
                {/*         <h3 class="card-title"> */}
                {/*             <a href="/able-brewing-system"> */}
                {/*                 [Sample] Able Brewing System */}
                {/*             </a> */}
                {/*         </h3> */}

                {/*         <div class="card-text" data-test-info-type="price"> */}
                {/*             <div class="price-section price-section--withTax rrp-price--withTax" style="display: none;"> */}
                {/*                 <span>MSRP:</span> */}
                {/*                 <span data-product-rrp-with-tax="" class="price price--rrp"></span> */}
                {/*             </div> */}
                {/*             <div class="price-section price-section--withTax non-sale-price--withTax" */}
                {/*                  style="display: none;"> */}
                {/*                 <span>Was:</span> */}
                {/*                 <span data-product-non-sale-price-with-tax="" class="price price--non-sale"></span> */}
                {/*             </div> */}
                {/*             <div class="price-section price-section--withTax price--withTax" style="display: none;"> */}
                {/*                 <span class=" price-label"=""> */}
                {/*                     <span class="price-now-label" style="display: none;">Now: */}
                {/*         </span> */}
                {/*         <span data-product-price-with-tax="" class="price"></span> */}
                {/*         <abbr title="Including Tax">(Inc. Tax)</abbr> */}
                {/*             </div> */}
                {/*             <div class="price-section price-section--withoutTax rrp-price--withoutTax" */}
                {/*                  style="display: none;"> */}
                {/*                 <span>MSRP:</span> */}
                {/*                 <span data-product-rrp-price-without-tax="" class="price price--rrp"></span> */}
                {/*             </div> */}
                {/*             <div class="price-section price-section--withoutTax non-sale-price--withoutTax" */}
                {/*                  style="display: none;"> */}
                {/*                 <span>Was</span> */}
                {/*                 <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span> */}
                {/*             </div> */}
                {/*             <div class="price-section price-section--withoutTax price--withoutTax"> */}
                {/*                 <span class="price-label"></span> */}
                {/*                 <span class="price-now-label" style="display: none;">Now:</span> */}
                {/*                 <span data-product-price-without-tax="" class="price">$225.00</span> */}
                {/*             </div> */}
                {/*         </div> */}
                {/*     </div> */}
                {/* </article> */}
            </SwiperSlide>
        </Swiper>
);
};
