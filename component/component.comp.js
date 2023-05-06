export class Component extends HTMLElement {
    #shadow;
    #styleSheetPath;
    #templatePath;

    /** @type {HTMLDivElement} */
    #root;

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
        this.beforeAppend();

        this.#setStyleSheet();

        this.#root = document.createElement('div');
        this.#root.classList.add('root')
        this.#shadow.appendChild(this.#root);

        if (this.#templatePath !== undefined) {
            const response = await fetch(this.#templatePath);
            const template = await response.text();
            this.#root.innerHTML += template;
        }

        setTimeout(() => {
            this.init();
        }, 0);
    }

    get root() {
        return this.#root
    }

    /** @returns {HTMLElement} */
    getChild(selector) {
        return this.#root.querySelector(selector);
    }

    init() { }

    beforeAppend() { }
}