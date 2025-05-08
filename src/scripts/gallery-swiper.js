import Base from "./base.js";
import Swiper from 'swiper/bundle';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/keyboard";

class GallerySwiper extends Base {
    constructor() {
        super();
    }

    _init() {
        super._init();

        this.#initSwiper();
    }

    _onPageChanged() {
        super._onPageChanged();
    }

    #initSwiper() {
        if (document.querySelector('.imageGallerySwiper') == null) {
            return;
        }

        const swiperContainers = document.querySelectorAll('.imageGallerySwiper');
        swiperContainers.forEach(function(swiperContainer) {
            new Swiper(swiperContainer, {
                navigation: {
                    nextEl: swiperContainer.querySelector(".swiper-button-next"),
                    prevEl: swiperContainer.querySelector(".swiper-button-prev"),
                },
                slidesPerView: 1,
                spaceBetween: 10,
                breakpoints: {
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1600: {
                        slidesPerView: 2,
                        spaceBetween: 35,
                    },
                }
            });
        });
    }
}
export default GallerySwiper;


