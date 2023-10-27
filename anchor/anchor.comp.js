export class AnchorComponent extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', (e) => {
            window.history.pushState({}, null, this.href);
            window.dispatchEvent(new Event('zzo-a-clicked'));
            e.preventDefault();
        });
    }
}
customElements.define('zzo-a', AnchorComponent, {
    extends: 'a',
});