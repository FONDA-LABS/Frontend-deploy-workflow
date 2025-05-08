import Base from "./base.js";
import TomSelect from "tom-select";

class Filter extends Base {
    constructor() {
        super();
    }

    _init() {
        super._init();

        this.initFilterEvents();
    }

    _onPageChanged() {
        super._onPageChanged();
    }

    initFilterEvents() {
        if (document.querySelector('.filter-container') == null) {
            return;
        }

        var searchInput = document.getElementById('search');
        var formContainer = document.querySelector('.cross-button');
        var iconContainer = document.querySelector('.search-icon-container');

        if (searchInput != null && formContainer != null && iconContainer != null) {
            searchInput.addEventListener('focus', function () {
                formContainer.classList.add('cross-button-active');
                iconContainer.classList.add('focus-active');
            });

            formContainer.addEventListener('click', function (event) {
                searchInput.value = '';
                if (event.target.tagName === 'SPAN') {
                    searchInput.value = '';
                }
            });

            document.addEventListener('click', function (event) {
                if(!formContainer.contains(event.target) && !searchInput.contains(event.target) && !iconContainer.contains(event.target)) {
                    formContainer.classList.remove('cross-button-active');
                    iconContainer.classList.remove('focus-active');
                }
            });
        }

        document.querySelectorAll('.filter-container').forEach(container => {
            container.querySelectorAll('.show-button').forEach(button => {
                button.addEventListener('click', function() {
                    const iconSpan = button.querySelector('.icon-arrow-down, .icon-arrow-up');

                    if (iconSpan) {
                        iconSpan.classList.toggle('rotated');
                    }

                    const addContentDiv = container.querySelector('.filters');
                    addContentDiv.classList.contains('active');
                    addContentDiv.classList.toggle('active');
                });
            });
        });

        document.querySelectorAll('.filter-dropdown-button').forEach(select => {
            new TomSelect(select, {
                maxOptions: null,
                create: false,
            });
        });
    }
}

export default Filter;
