import { Component } from "../component/component.comp.js";
import { RouteMatchedEvent } from "./routing.events.js";

export class RoutingComponent extends Component {

    #routeMap = {};
    hashRouting = true;
    subPath = undefined;

    init() {
        this.hasChangeEvent = window.addEventListener('hashchange', () => this.#checkRoute());
        this.routeLinkClickedEvent = window.addEventListener('zzo-a-clicked', () => this.#checkRoute());
        this.#checkRoute();
    }

    #checkRoute() {
        this.root.replaceChildren();

        for (const routeKey in this.#routeMap) {
            let toTest = this.hashRouting ? window.location.hash : window.location.pathname;
            toTest = this.subPath === undefined ? toTest : toTest.substring(this.subPath.length, toTest.length);

            const regExp = new RegExp(routeKey);
            const matches = toTest.match(regExp);
            if (!matches || matches.length < 1) {
                continue;
            }

            const routeInfo = this.#routeMap[routeKey];
            if (routeInfo.redirect) {
                window.location.hash = routeInfo.redirect;
                break;
            }

            const type = routeInfo.component;
            var instance;

            var params;
            if (routeInfo.params) {
                params = routeInfo.params(matches);
                instance = new type(...params);
            } else {
                instance = new type();
            }

            this.root.appendChild(instance);

            this.dispatchEvent(new RouteMatchedEvent(routeInfo, params));

            break;
        }
    }

    setRouteMap(map) {
        this.#routeMap = map;
        this.#checkRoute();
    }

}
customElements.define('zzo-routing', RoutingComponent);