import Base from "./base.js";

class FactsAnimated extends Base {
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
        const factsCounterSections = document.querySelectorAll('.facts-animated');

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
        const factItems = document.querySelectorAll('.fact-item');

        // Using IntersectionObserver to handle the animation when fact-items are in view
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const digits = entry.target.querySelectorAll('.digit');

                    // Animate each digit inside the fact-item-counter-number
                    digits.forEach((digit, index) => {
                        setTimeout(() => {
                            digit.classList.add('animate'); // Add animation class to each digit
                        }, index * 200); // Delay each digit by 100ms for staggered effect
                    });

                    entry.target.classList.add('in-view'); // Optional: Add class to the whole fact-item
                    observer.unobserve(entry.target); // Stop observing once the animation is triggered
                }
            });
        }, { threshold: 0.4 }); // Trigger when 40% of the element is visible

        // Observe each fact-item for when it comes into view
        factItems.forEach(item => {
            observer.observe(item);
        });
    }

}

export default FactsAnimated;
