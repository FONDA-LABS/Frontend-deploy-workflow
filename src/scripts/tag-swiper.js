import Base from "./base.js";
import Swiper from 'swiper/bundle';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/keyboard";

class TagSwiper extends Base {
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
        if (document.querySelectorAll('.tagSwiper') === null) {
            return;
        }

        const swiperContainers = document.querySelectorAll('.tagSwiper');
        swiperContainers.forEach(function(swiperContainer) {
            new Swiper(swiperContainer, {
                navigation: {
                    nextEl: swiperContainer.querySelector(".swiper-button-next"),
                    prevEl: swiperContainer.querySelector(".swiper-button-prev"),
                },
                slidesPerView: "auto",
                spaceBetween: 4,
            });
        });
    }
}
export default TagSwiper;
