import Base from "./base.js";
import Swiper from 'swiper/bundle';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/keyboard";

class CardSwiper extends Base {
    constructor() {
        super();
    }

    _init() {
        super._init();

        this.#initCardSwiper();
    }

    _onPageChanged() {
        super._onPageChanged();
    }

    #initCardSwiper() {
        if (document.querySelectorAll('.cardSwiper') === null) {
            return;
        }
        const swipers = document.querySelectorAll('.cardSwiper');
        let swiperInstances = [];
        let areSwipersInitialized = false;
        function initSwipers() {
            swipers.forEach(function(swiperContainer) {
                const swiper = new Swiper(swiperContainer, {
                    navigation: {
                        nextEl: swiperContainer.querySelector(".swiper-button-next"),
                        prevEl: swiperContainer.querySelector(".swiper-button-prev"),
                    },
                    slidesPerView: 1,
                    spaceBetween: 10,
                    breakpoints: {
                        1024: {
                            enabled: false,
                        },
                    }
                });
                swiperInstances.push(swiper);
            });
            areSwipersInitialized = true;
        }
        function destroySwipers() {
            swiperInstances.forEach(swiper => {
                swiper.destroy(true, true);
            });
            swiperInstances = [];
            areSwipersInitialized = false;
        }
        function handleResize() {
            const width = window.innerWidth;
            if (width <= 1024) {
                if (!areSwipersInitialized) {
                    initSwipers();
                }
            } else {
                if (areSwipersInitialized) {
                    destroySwipers();
                }
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
    }
}
export default CardSwiper;
