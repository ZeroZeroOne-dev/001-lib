export class RouteMatchedEvent extends Event {

    static Key = 'routeMatched';
    routeInfo;

    constructor(routeInfo, /** @type {EventInit} */ eventInitDict = undefined) {
        super(RouteMatchedEvent.Key, eventInitDict);

        this.routeInfo = routeInfo;
    }

}