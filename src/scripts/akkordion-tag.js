import Base from "./base.js";

class AkkordionTag extends Base {
    constructor() {
        super();
    }

    _init() {
        super._init();
        this.initAkkordionTagEvents();
    }

    _onPageChanged() {
        super._onPageChanged();
    }

    initAkkordionTagEvents() {
        const showMoreTags = document.querySelectorAll('.tag-show-more');

        if (showMoreTags === null) {
            return;
        }


        showMoreTags.forEach(button => {
            button.addEventListener('click', function () {
                const container = this.closest('.tag-container');

                if (container === null) {
                    return;
                }

                const tags = container.querySelectorAll('.tag-hidden, .tag-show');

                if (tags === null) {
                    return;
                }

                const isHidden = tags[0].classList.contains('tag-hidden');
                const buttonLabelShow = this.getAttribute('data-label-show');
                const buttonLabelHide = this.getAttribute('data-label-hide');
                const showMoreContent = this.querySelector('.tag-show-more-content');
                const showLessContent = this.querySelector('.tag-show-less-content');

                tags.forEach(tag => {
                    if (isHidden) {
                        tag.classList.remove('tag-hidden');
                        tag.classList.add('tag-show');
                        tag.classList.remove('tag-no-border');
                    } else {
                        tag.classList.remove('tag-show');
                        tag.classList.add('tag-hidden');
                        tag.classList.add('tag-no-border');
                    }
                });

                if (isHidden) {
                    this.setAttribute('aria-label', buttonLabelHide);
                    button.classList.add('tag-no-border');

                    if (showMoreContent !== null && showLessContent !== null) {
                        showMoreContent.style.display = 'none';
                        showLessContent.style.display = 'block';
                    }
                } else {
                    this.setAttribute('aria-label', buttonLabelShow);
                    button.classList.remove('tag-no-border');

                    if (showMoreContent !== null && showLessContent !== null) {
                        showMoreContent.style.display = 'block';
                        showLessContent.style.display = 'none';
                    }
                }
            });
        });
    }
}

export default AkkordionTag;
