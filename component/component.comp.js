export class Component extends HTMLElement {
    #shadow;
    #styleSheetPaths;
    #templatePath;

    /** @type {HTMLDivElement} */
    #container;

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
        this.#setStyleSheet();

        this.#container = document.createElement("div");
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
        return this.#container;
    }

    /** @returns {HTMLElement} */
    getChild(selector) {
        return this.#container.querySelector(selector);
    }

    init() {}
}
