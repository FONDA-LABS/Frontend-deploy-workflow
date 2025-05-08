import Base from "./base.js";
import Swiper from 'swiper/bundle';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/keyboard";

class TimerSwiper extends Base {
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
        if (document.querySelector('.text-swiper-timer') == null || document.querySelector('.image-swiper-timer') == null) {
            return;
        }

        const DELAY_DURATION = 2500;
        const ANIMATION_DURATION = 2000;
        const WAIT_WHILE_CIRCLE_FULL = 400;
        const swiper1 = new Swiper('.text-swiper-timer', {
            slidesPerView: 1,
            spaceBetween: 40,
            loop: true,
            speed: ANIMATION_DURATION,
            allowTouchMove: false,
            navigation: false,
            autoplay: {
                delay: DELAY_DURATION + WAIT_WHILE_CIRCLE_FULL,
                disableOnInteraction: false,
            },
        });
        const swiper2 = new Swiper('.image-swiper-timer', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: ANIMATION_DURATION,
            allowTouchMove: false,
            navigation: false,
        });
        swiper1.controller.control = swiper2;
        swiper2.controller.control = swiper1;
        swiper1.shouldChangeState = false;
        let firstAnimation = true;
        let auto_animation = true;
        let stopped_from_navigation = false;
        const swiperIndexWrapper = document.querySelector('.swiper-index-wrapper-timer');

        if (swiperIndexWrapper === null) {
            return;
        }

        const numberContainer = swiperIndexWrapper.querySelector('.number-container-timer');
        const currentNumber = numberContainer.querySelector('.current');
        const nextNumber = numberContainer.querySelector('.next');
        let totalSlides;
        swiper2.on('init', function () {
            totalSlides = this.slides.length;
        });
        swiper2.on('slideChange', function () {
            const newIndex = this.realIndex + 1;
            const oldIndex = parseInt(currentNumber.textContent) || 1;
            updateNumberTimer(newIndex, oldIndex);
            if (auto_animation === true) {
                const circle = document.getElementById('circle-timer');
                circle.style.transition = 'stroke-dashoffset 0s linear';
                updateCircleProgressTimer(0);
                setTimeout(() => {
                    circle.style.transition = `stroke-dashoffset ${firstAnimation ? DELAY_DURATION : (DELAY_DURATION + ANIMATION_DURATION)}ms linear`;
                    updateCircleProgressTimer(100);
                    firstAnimation = false;
                }, 50);
            }
        });
        function updateNumberTimer(newIndex, oldIndex) {
            if (newIndex === oldIndex) return;
            const direction = newIndex > oldIndex ? 'up' : 'down';
            currentNumber.textContent = oldIndex;
            nextNumber.textContent = newIndex;
            numberContainer.style.transition = 'none';
            numberContainer.style.transform = 'translateY(0)';
            requestAnimationFrame(() => {
                numberContainer.style.transition = 'transform 0.5s ease';
                numberContainer.style.transform = direction === 'up' ? 'translateY(-50%)' : 'translateY(50%)';
            });
            setTimeout(() => {
                currentNumber.textContent = newIndex;
                numberContainer.style.transition = 'none';
                numberContainer.style.transform = 'translateY(0)';
            }, 500);
        }
        swiper2.init();
        swiper1.on('slideChangeTransitionEnd', function (swiper) {
            if (swiper.shouldChangeState === true) {
                let totalDuration = 0;
                if (firstAnimation === true) {
                    totalDuration = DELAY_DURATION + ANIMATION_DURATION;
                } else {
                    totalDuration = DELAY_DURATION;
                }
                const circle = document.getElementById('circle-timer');
                if (auto_animation === false) {
                    let pausePosition = getCurrentCircleProgressTimer();
                    const remainingTime = (100 - pausePosition) / 100 * totalDuration;
                    circle.style.transition = `stroke-dashoffset ${remainingTime}ms linear`;
                    updateCircleProgressTimer(100);
                    swiper1.autoplay.resume();
                } else {
                    swiper1.autoplay.pause();
                    let pausePosition = getCurrentCircleProgressTimer();
                    circle.style.transition = 'stroke-dashoffset 0s linear';
                    updateCircleProgressTimer(pausePosition);
                }
                swiper1.shouldChangeState = false;
                auto_animation = !auto_animation;
            }
        });
        function updateCircleProgressTimer(percentage) {
            const circle = document.getElementById('circle-timer');
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percentage / 100) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        }
        function getCurrentCircleProgressTimer() {
            const circle = document.getElementById('circle-timer');
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const currentOffset = parseFloat(getComputedStyle(circle).strokeDashoffset);
            return ((circumference - currentOffset) / circumference) * 100;
        }
        const circleContainer = document.getElementById('circle-container-timer');
        circleContainer.addEventListener('click', function () {
            swiper1.shouldChangeState = true;
            const image = document.getElementById('play-image-timer');
            if (auto_animation === false) {
                image.classList.remove('icon-play');
                image.classList.add('icon-pause');
            } else {
                image.classList.remove('icon-pause');
                image.classList.add('icon-play');
            }
            if (swiper1.animating === false) {
                if (swiper1.shouldChangeState === true) {
                    let totalDuration = 0;
                    if (firstAnimation === true) {
                        totalDuration = DELAY_DURATION + ANIMATION_DURATION;
                    } else {
                        totalDuration = DELAY_DURATION;
                    }
                    const circle = document.getElementById('circle-timer');
                    if (auto_animation === false) {
                        let pausePosition = getCurrentCircleProgressTimer();
                        const remainingTime = (100 - pausePosition) / 100 * totalDuration;
                        circle.style.transition = `stroke-dashoffset ${remainingTime}ms linear`;
                        updateCircleProgressTimer(100);
                        swiper1.autoplay.resume();
                    } else {
                        swiper1.autoplay.pause();
                        let pausePosition = getCurrentCircleProgressTimer();
                        circle.style.transition = 'stroke-dashoffset 0s linear';
                        updateCircleProgressTimer(pausePosition);
                    }
                    swiper1.shouldChangeState = false;
                }
                auto_animation = !auto_animation;
            }
        });
        const nextButton = document.getElementById('next-button-timer');
        const prevButton = document.getElementById('prev-button-timer');
        nextButton.addEventListener('click', () => {
            swiper1.autoplay.pause();
            auto_animation = false;
            swiper1.slideNext();
            const circle = document.getElementById('circle-timer');
            let pausePosition = getCurrentCircleProgressTimer();
            circle.style.transition = 'stroke-dashoffset 0s linear';
            updateCircleProgressTimer(pausePosition);
            const image = document.getElementById('play-image-timer');
            image.classList.remove('icon-pause');
            image.classList.add('icon-play');
        });
        prevButton.addEventListener('click', () => {
            swiper1.autoplay.pause();
            auto_animation = false;
            swiper1.slidePrev();
            const circle = document.getElementById('circle-timer');
            let pausePosition = getCurrentCircleProgressTimer();
            circle.style.transition = 'stroke-dashoffset 0s linear';
            updateCircleProgressTimer(pausePosition);
            const image = document.getElementById('play-image-timer');
            image.classList.remove('icon-pause');
            image.classList.add('icon-play');
        });
        const swiperIndex = document.getElementById('swiper-index');
        const swiperLength = swiper1.slides.length;
    }
}
export default TimerSwiper;
