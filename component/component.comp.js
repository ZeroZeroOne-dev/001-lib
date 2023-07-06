export class Component extends HTMLElement {
    #shadow;
    #styleSheetPaths;
    #templatePath;

    /** @type {HTMLDivElement} */
    #root;

    /**
     * @param {{styleSheets: string[], template: string,}} myObj description
     */
    constructor({ styleSheets = undefined, template = undefined } = {}) {
        super();

        this.#shadow = this.attachShadow({ mode: "open" });

        this.#styleSheetPaths = styleSheets;
        this.#templatePath = template;
        this.#makeContainer();
    }

    #setStyleSheet() {
        let imports;

        if (
            this.#styleSheetPaths == undefined ||
            this.#styleSheetPaths.length === 0
        ) {
            imports = `
                @import '/001-lib/component/component.comp.css';
            `;
        } else {
           const sheets = this.#styleSheetPaths.map(s => `@import '${s}'`).join(';\r\n');

            imports = `
                @import '/001-lib/component/component.comp.css';
                ${sheets}
            `;
        }

        const style = document.createElement("style");
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
