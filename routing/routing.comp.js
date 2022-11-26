import { Component } from "../component/component.comp.js";

export class RoutingComponent extends Component {

    static #RouteMap = {};

    constructor() {
        super();
    }

    init() {
        this.routeChangeEvent = window.addEventListener('hashchange', () => this.#checkRoute());
        this.#checkRoute();
    }

    #checkRoute() {
        this.root.replaceChildren();

        for (const routeKey in RoutingComponent.#RouteMap) {
            const regExp = new RegExp(routeKey);
            const matches = window.location.hash.match(regExp);
            if (!matches || matches.length < 1) {
                continue;
            }

            const routeInfo = RoutingComponent.#RouteMap[routeKey];
            if (routeInfo.redirect) {
                window.location.hash = routeInfo.redirect;
                break;
            }

            const type = routeInfo.component;
            var instance;

            if (routeInfo.params) {
                const data = routeInfo.params(matches);
                instance = new type(...data);
            } else {
                instance = new type();
            }

            this.root.appendChild(instance);
            break;
        }
    }

    static setRouteMap(map) {
        this.#RouteMap = map;
    }

}
customElements.define('lib-routing-001', RoutingComponent);