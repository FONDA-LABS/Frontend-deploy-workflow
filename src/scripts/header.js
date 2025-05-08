import Base from "./base.js";

class Header extends Base {
    constructor() {
        super();
    }

    _init() {
        super._init();

        this.#initHeader();
    }

    _onPageChanged() {
        super._onPageChanged();
    }

    #initHeader() {
        document.querySelectorAll('.list-button').forEach(button => {
            button.addEventListener('click', function (e) {
                const popover = this.nextElementSibling;
                const isVisible = popover.style.display === 'block';
                document.querySelectorAll('.popover-content').forEach(p => p.style.display = 'none');
                document.querySelectorAll('.list-button').forEach(btn => {
                    btn.classList.remove('active-button');
                });
                if (!isVisible) {
                    popover.style.display = 'block';
                    this.classList.add('active-button');
                }
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.popover-container')) {
                document.querySelectorAll('.popover-content').forEach(p => p.style.display = 'none');
                document.querySelectorAll('.list-button').forEach(btn => {
                    btn.classList.remove('active-button');
                });
            }
        });

        /* Desktop Search Popover */
        const searchPopover = document.querySelector('.desktop-popover');
        const searchButton = document.querySelector('.search-container');
        const desktopSearchInput = document.getElementById('desktop-search-input');
        const mainHeaderWrapper = document.getElementById('main-header-area');
        searchButton.addEventListener('click', function (event) {
            mainHeaderWrapper.style.zIndex = '0';
            searchPopover.addEventListener("transitionend", function (e) {
                if (searchPopover.classList.contains('show')) {
                    if (event.pointerType === 'mouse' || (event.pointerType === '' && event.detail !== 0)) {
                        desktopSearchInput.focus();
                    }
                }
            }, {once: true});
            searchPopover.classList.toggle('show');
        });
        document.addEventListener('click', function (event) {
            if (!searchButton.contains(event.target) && !searchPopover.contains(event.target)) {
                searchPopover.classList.remove('show');
                searchPopover.addEventListener('transitionend', function () {
                    if (!searchPopover.classList.contains('show'))
                        mainHeaderWrapper.style.zIndex = '900';
                }, {once: true});
            }
        });

        function closePopoverOnFocusOut() {
            document.addEventListener('focusin', function (event) {
                if (searchPopover.classList.contains('show') &&
                    !searchPopover.contains(event.target) &&
                    !searchButton.contains(event.target)) {
                    searchPopover.classList.remove('show');
                    searchPopover.addEventListener('transitionend', function () {
                        if (!searchPopover.classList.contains('show')) {
                            mainHeaderWrapper.style.zIndex = '900';
                        }
                    }, {once: true});
                }
            });
        }

        closePopoverOnFocusOut();


        /* Desktop Search Input */
        const deleteDesktopSearchInput = document.querySelector('.desktop-search-input-delete');
        deleteDesktopSearchInput.addEventListener('click', function () {
            desktopSearchInput.value = '';
        });
        deleteDesktopSearchInput.addEventListener('keydown', function () {
            desktopSearchInput.value = '';
        });

        /* Burger Menu popover */
        const burgerMenu = document.querySelector('.burger-menu');
        const burgerPopover = document.querySelector('.mobile-popover');
        const closeButton = document.querySelector('#mobile-popover-close');
        const body = document.body;
        burgerMenu.addEventListener('click', function () {
            burgerPopover.classList.toggle('show');
            body.style.overflow = 'hidden';
        });
        closeButton.addEventListener('click', function () {
            burgerPopover.classList.remove('show');
            body.style.overflow = 'scroll';
        });

        const mobileNav = document.getElementById('mobile-nav-element');
        const navPopover = document.querySelector('.mobile-popover-navigation');
        const mobileNavCloseButton = document.getElementById('mobile-navigation-popover-close');
        mobileNavCloseButton.addEventListener('click', function () {
            burgerPopover.classList.remove('show');
            navPopover.classList.remove('show');
            body.style.overflow = 'scroll';
        });

        /* Open detailed Navigation Section with only the one correct List Element */
        const navElements = document.querySelectorAll('[id^="mobile-nav-element-"]');
        navElements.forEach(navElement => {
            navElement.addEventListener('click', function () {
                const navPopover = document.querySelector('.mobile-popover-navigation');
                navPopover.classList.toggle('show');

                const allDetailLists = document.querySelectorAll('[id^="list-wrapper-"]');
                allDetailLists.forEach(detailList => {
                    detailList.style.display = 'none';
                });

                const idNumber = this.id.split('-').pop();
                const currentDetailList = document.getElementById('list-wrapper-' + idNumber);
                currentDetailList.style.display = 'block';
            });
        });

        /* Go back to the first navigation popover */
        const backNav = document.querySelector('.back-navigation-wrapper');

        if (backNav === null) {
            return;
        }

        backNav.addEventListener('click', function () {
            navPopover.classList.remove('show');
        });

        /* Animationen der Suchfunktion */
        const searchInput = document.getElementById('mobile-search');
        const closeIcon = document.getElementById('mobile-popover-close-icon');
        const buttonWrapper = document.getElementById('mobile-popover-close-wrapper');
        const searchIcon = document.getElementById('mobile-search-icon');
        const searchContainer = document.getElementById('mobile-search-container');
        const spaceVector = document.getElementById('space-vector');
        searchInput.addEventListener('focus', function () {
            closeButton.classList.add('focused');
            buttonWrapper.classList.add('focused');
            searchIcon.classList.add('focused');
            closeIcon.classList.add('focused');
            searchContainer.classList.add('focused');
            spaceVector.classList.add('focused');
        });
        searchInput.addEventListener('blur', function () {
            closeButton.classList.remove('focused');
            buttonWrapper.classList.remove('focused');
            searchIcon.classList.remove('focused');
            closeIcon.classList.remove('focused');
            searchContainer.classList.remove('focused');
            spaceVector.classList.remove('focused');
        });
        searchIcon.addEventListener('click', function () {
            searchInput.value = '';
        });

        /* Animationen der Suchfunktion der Unterpunkte */
        const searchInput2 = document.getElementById('mobile-search-detailed');
        const closeIcon2 = document.getElementById('mobile-popover-detailed-close-icon');
        const buttonWrapper2 = document.getElementById('mobile-navigation-popover-close-wrapper');
        const searchIcon2 = document.getElementById('mobile-search-icon-detailed');
        const searchContainer2 = document.getElementById('mobile-search-container-detailed');
        const spaceVector2 = document.getElementById('space-vector-detailed');
        searchInput2.addEventListener('focus', function () {
            mobileNavCloseButton.classList.add('focused');
            buttonWrapper2.classList.add('focused');
            searchIcon2.classList.add('focused');
            searchContainer2.classList.add('focused');
            spaceVector2.classList.add('focused');
        });
        searchInput2.addEventListener('blur', function () {
            mobileNavCloseButton.classList.remove('focused');
            buttonWrapper2.classList.remove('focused');
            searchIcon2.classList.remove('focused');
            searchContainer2.classList.remove('focused');
            spaceVector2.classList.remove('focused');
        });
        searchIcon2.addEventListener('click', function () {
            searchInput2.value = '';
        });


        /* Dark search overlay */
        const searchOverlay = document.querySelector('.search-dark-layer');
        const mainHeader = document.querySelector('.main-header-area-wrapper');

        if (searchOverlay === null || mainHeader === null) {
            return;
        }

        searchButton.addEventListener("click", function () {
            searchOverlay.classList.add('layer-active');
            body.classList.add('no-scroll');

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        body.addEventListener("click", function (ev) {
            if (mainHeader.contains(ev.target)) {
                return;
            }

            searchOverlay.classList.remove('layer-active');
            body.classList.remove('no-scroll');
        });
    }
}

export default Header;
