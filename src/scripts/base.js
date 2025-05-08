class Base {
    // _instance variable for singleton pattern
    static _instance = null;

    constructor() {
        // create singleton instance
        if (Base._instance == null) {
            Base._instance = this;
        }
    }

    _init() {
        // Example init function
        // this.initFunction();

        // Example Event Listener
        // document.addEventListener('click', this.onClickHandler.bind(this));
    }

    _onPageChanged() {
        // Called if Taxi.js is used and changed the page ...
    }
}

export default Base;