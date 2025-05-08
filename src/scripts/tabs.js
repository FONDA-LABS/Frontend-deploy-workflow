import Base from "./base.js";

class Tablist extends Base {
    constructor() {
        super();
    }

    _init() {
        super._init();

        this.#initTablist();

        // Example Event Listener
        // document.addEventListener('click', this.onClickHandler.bind(this));
    }

    _onPageChanged() {
        super._onPageChanged();
        // Called if Taxi.js is used and changed the page ...
    }

    #initTablist() {
        const tablists = document.querySelectorAll('[role="tablist"]');

        if (tablists === null) {
            return;
        }

        tablists.forEach((tablist) => {
            const tabs = tablist.querySelectorAll('[role="tab"]');
            tabs.forEach((tab) => {
                tab.addEventListener('click', (event) => {
                    const panelId = tab.getAttribute('aria-controls');
                    tabs.forEach((t) => {
                        const controlledPanelId = t.getAttribute('aria-controls');
                        const controlledPanel = document.getElementById(controlledPanelId);
                        if (controlledPanelId === panelId) {
                            controlledPanel.removeAttribute('hidden');
                            controlledPanel.setAttribute('tabindex', 0);
                            t.setAttribute('aria-selected', true);
                        } else {
                            controlledPanel.setAttribute('hidden', true);
                            controlledPanel.setAttribute('tabindex', -1);
                            t.setAttribute('aria-selected', false);
                        }
                    });
                });
            });
        });
    }
}
export default Tablist;
