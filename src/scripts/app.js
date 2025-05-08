import Base from "./base.js";

class App extends Base {
    constructor() {
        super();
    }
    _init() {
        super._init();

        this.#initTableWrapper();
        this.#initScrollButton();

        this.#initCustomAccordion();
        this.#initCustomAccordionPrint();
    }

    _onPageChanged() {
        super._onPageChanged();
        // Called if Taxi.js is used and changed the page ...
    }

    #initTableWrapper() {
        const contentAreaTables = document.querySelectorAll('.content-area table');

        if (contentAreaTables === null)
            return;

        contentAreaTables.forEach((singleTable) => {
            const tableWrapper = document.createElement('div');
            tableWrapper.classList.add('responsive-table');
            singleTable.before(tableWrapper);
            tableWrapper.appendChild(singleTable);
        });
    }

    #initScrollButton() {
        const scrollButtons = document.querySelectorAll('.back-to-top-wrapper-button');

        if (scrollButtons === null) {
            return;
        }

        scrollButtons.forEach((button) => {
            button.addEventListener('click', () => {
                window.scrollTo({
                    top: button.dataset.down ? window.innerHeight : 0,
                    behavior: 'smooth'
                });
            });
        });
    }

    #initCustomAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');

        if (accordionHeaders === null)
            return;

        accordionHeaders.forEach((singleAccordionHeader) => {
            singleAccordionHeader.addEventListener('click', (e) => {
                accordionHeaders.forEach((otherHeader) => {
                    if (otherHeader !== singleAccordionHeader) {
                        otherHeader.setAttribute('aria-expanded', false);
                        otherHeader.setAttribute('aria-selected', false);
                        const otherContent = document.getElementById(otherHeader.getAttribute('aria-controls'));
                        if (otherContent) {
                            otherContent.hidden = true;
                        }
                    }
                });

                const expanded = singleAccordionHeader.getAttribute('aria-expanded') === 'true' || false;
                singleAccordionHeader.setAttribute('aria-expanded', !expanded);
                singleAccordionHeader.setAttribute('aria-selected', !expanded);
                const content = document.getElementById(singleAccordionHeader.getAttribute('aria-controls'));
                if (content) {
                    content.setAttribute('aria-hidden', expanded);
                    content.hidden = !content.hidden;
                }
            });
        });
    }

    #initCustomAccordionPrint() {
        let accordionStates = []; // Array to store the state of each accordion

        function saveAccordionStates() {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            // Save the state of each accordion
            accordionStates = Array.from(accordionHeaders).map(header => ({
                id: header.getAttribute('aria-controls'),
                expanded: header.getAttribute('aria-expanded') === 'true'
            }));
        }

        function openAllAccordionsForPrint() {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            accordionHeaders.forEach(header => {
                header.setAttribute('aria-expanded', 'true');
                const contentId = header.getAttribute('aria-controls');
                const content = document.getElementById(contentId);
                content.hidden = false;
            });
        }

        function restoreAccordionStates() {
            accordionStates.forEach(({id, expanded}) => {
                const header = document.querySelector(`.accordion-header[aria-controls="${id}"]`);
                const content = document.getElementById(id);
                header.setAttribute('aria-expanded', expanded.toString());
                content.hidden = !expanded;
            });
        }

        // Listen for beforeprint event to save states and open accordions
        window.addEventListener('beforeprint', () => {
            saveAccordionStates();
            openAllAccordionsForPrint();
        });

        // Listen for afterprint event to restore accordion states
        window.addEventListener('afterprint', restoreAccordionStates);
    }
}

export default App;
