import Base from "./base.js";
import Swiper from 'swiper/bundle';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/keyboard";

class BreadCrumbSwiper extends Base {
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
        if (document.querySelector('.breadCrumbSwiper') == null) {
            return;
        }

        const swipers = document.querySelectorAll('.breadCrumbSwiper');
        swipers.forEach(function(swiperContainer) {
            const swiperInstance = new Swiper(swiperContainer, {
                navigation: {
                    nextEl: swiperContainer.querySelector(".swiper-button-next"),
                    prevEl: swiperContainer.querySelector(".swiper-button-prev"),
                },
                slidesPerView: 'auto',
                spaceBetween: 24,
                breakpoints: {
                    1024: {
                        enabled: false,
                    },
                }
            });

            const updateNavigationVisibility = () => {
                const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
                const wrapperWidth = swiperWrapper.scrollWidth; // Total width of swiper slides
                const viewportWidth = window.innerWidth; // Width of viewport
                const nextButton = swiperInstance.navigation.nextEl;
                const prevButton = swiperInstance.navigation.prevEl;
                const navigationContainer = swiperContainer.querySelector('.swipe-button-container'); // Assuming you have a container for navigation buttons

                if (wrapperWidth <= viewportWidth - 40) {
                    nextButton.style.display = 'none';
                    prevButton.style.display = 'none';

                    // Remove .container-visible class when buttons are hidden
                    if (navigationContainer) {
                        navigationContainer.classList.remove('container-visible');
                    }
                } else {
                    nextButton.style.display = '';
                    prevButton.style.display = '';

                    // Add .container-visible class when buttons are shown
                    if (navigationContainer) {
                        navigationContainer.classList.add('container-visible');
                    }
                }
            };

            updateNavigationVisibility(); // Call the function on initialization

            window.addEventListener('resize', updateNavigationVisibility); // Call the function on window resize
        });
    }
}
export default BreadCrumbSwiper;

