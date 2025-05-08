import Base from "./base.js";
import Swiper from 'swiper/bundle';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/keyboard";

class ColumnCardSwiper extends Base {
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
        if (document.querySelector('.columnCardSwiper') == null) {
            return;
        }

        const swipers = document.querySelectorAll('.columnCardSwiper');
        swipers.forEach(function(swiperContainer) {
            new Swiper(swiperContainer, {
                navigation: {
                    nextEl: swiperContainer.querySelector(".swiper-button-next"),
                    prevEl: swiperContainer.querySelector(".swiper-button-prev"),
                },
                slidesPerView: 1.1,
                spaceBetween: 24,
                breakpoints: {
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1600: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    }
                }
            });
        });
    }
}
export default ColumnCardSwiper;