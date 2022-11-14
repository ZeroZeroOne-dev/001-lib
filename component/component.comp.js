export class Component extends HTMLElement {
    #shadow;
    #styleSheetPath;
    #templatePath;

    /** @type {HTMLDivElement} */
    #container;

    constructor({
        styleSheet = undefined,
        template = undefined
    } = {}) {
        super();

        this.#shadow = this.attachShadow({ mode: 'open' });

        this.#styleSheetPath = styleSheet;
        this.#templatePath = template;
        this.#makeContainer();
    }

    #setStyleSheet() {
        let imports;

        if (this.#styleSheetPath == undefined) {
            imports = `
                @import '/001-lib/component/component.comp.css';
            `;
        } else {
            imports = `
                @import '/001-lib/component/component.comp.css';
                @import '${this.#styleSheetPath}';
            `;
        }

        const style = document.createElement('style');
        style.innerHTML = imports;
        this.#shadow.appendChild(style);
    }

    async #makeContainer() {
        this.#setStyleSheet();

        this.#container = document.createElement('div');
        this.#shadow.appendChild(this.#container);

        if (this.#templatePath !== undefined) {
            const response = await fetch(this.#templatePath);
            const template = await response.text();
            this.#container.innerHTML += template;
        }

        setTimeout(() => {
            this.init();
        }, 0);
    }

    get container() {
        return this.#container
    }

    /** @returns {HTMLElement} */
    getChild(selector) {
        return this.#container.querySelector(selector);
    }

    init() { }
}