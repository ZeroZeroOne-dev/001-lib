export class RouteMatchedEvent extends Event {

    static #Key = 'routeMatched';
    #routeInfo;
    #params;

    constructor(routeInfo, params = undefined, /** @type {EventInit} */ eventInitDict = undefined) {
        super(RouteMatchedEvent.Key, eventInitDict);

        this.#routeInfo = routeInfo;
        this.#params = params;
    }

    static get Key() {
        return this.#Key;
    }

    get routeInfo() {
        return this.#routeInfo;
    }

    get params() {
        return this.#params;
    }

}