import Base from "./base.js";

class BentoAnimated extends Base {
    constructor() {
        super();
    }

    _init() {
        super._init();
        this.#initFactsAnimated();
    }

    _onPageChanged() {
        super._onPageChanged();
    }

    #initFactsAnimated() {
        const factsCounterSections = document.querySelectorAll('.bento-box-grid');

        if (factsCounterSections === null)
            return;


        factsCounterSections.forEach((singleFactsCounterSections) => {
            ['scroll', 'resize'].forEach(event => {
                window.addEventListener(event, () => {
                    if (this.#isInViewport(singleFactsCounterSections)) {
                        this.#animateCounters();
                    }
                });
            });

            // Check initially if in viewport
            if (this.#isInViewport(singleFactsCounterSections)) {
                this.#animateCounters();
            }
        });
    }

    #isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            rect.top < viewportHeight && rect.bottom > 0
        );
    }

    #animateCounters() {
        const factItems = document.querySelectorAll('.content-big-container');


        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const digits = entry.target.querySelectorAll('.card-content-big');


                    digits.forEach((digit, index) => {
                        setTimeout(() => {
                            digit.classList.add('animate'); // Add animation class to each digit
                        }, index * 200); // Delay each digit by 100ms for staggered effect
                    });

                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });


        factItems.forEach(item => {
            observer.observe(item);
        });
    }

}

export default BentoAnimated;
