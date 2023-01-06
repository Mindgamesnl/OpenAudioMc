export class Checkbox {

    constructor(elementName) {
        this.element = document.getElementById(elementName)
        this.storeStateAs = null;
        this.handlers = [];
        this.isEnabled = this.element.checked;

        this.element.onchange = (e) => {
            let isCheckedNow = e.target.checked;
            this._callHandlers(isCheckedNow);
            this.isEnabled = isCheckedNow;
            if (this.storeStateAs != null) {
                Cookies.get("checkbox-" + this.storeStateAs, (isCheckedNow ? "enabled" : "disabled"), {expires: 30})
            }
        }

        this._callHandlers(this.isEnabled)
    }

    useCookie(cookieName) {
        this.storeStateAs = cookieName;
        this.element.checked = (Cookies.get("checkbox-" + cookieName) === "enabled")
        this._callHandlers(this.element.checked)
        this.isEnabled = this.element.checked;
        return this;
    }

    onChange(handler) {
        handler(this.isEnabled)
        this.handlers.push(handler)
        return this
    }

    _callHandlers(c) {
        for (let i = 0; i < this.handlers.length; i++) {
            this.handlers[i](c)
        }
    }


}