export class AlertBox {
    constructor(id, option) {
        this.id = id;
        this.option = option;
        this.onTimeout = null;
    }

    show(msg, isHtml = false) {
        if (msg === ''  || typeof msg === 'undefined' || msg === null) {
            throw '"msg parameter is empty"';
        }
        else {
            this.alertArea = document.querySelector(this.id);
            this.alertBox = document.createElement('DIV');
            this.alertContent = document.createElement('DIV');
            this.alertClose = document.createElement('A');
            this.alertClass = this;
            this.alertContent.classList.add('alert-content');
            if (isHtml) {
                this.alertContent.innerHTML = msg;
            } else {
                this.alertContent.innerHTML = "<p>" + msg + "</p>";
            }
            this.alertClose.classList.add('alert-close');
            this.alertClose.setAttribute('href', '#');
            this.alertBox.classList.add('alert-box');
            this.alertBox.classList.add('p-3');
            this.alertBox.classList.add('blurIn');
            if (this.option.extra != null) this.alertBox.classList.add(this.option.extra);
            this.alertBox.appendChild(this.alertContent);
            if (!this.option.hideCloseButton || typeof this.option.hideCloseButton === 'undefined') {
                this.alertBox.appendChild(this.alertClose);
            }
            this.alertArea.appendChild(this.alertBox);
            this.alertClose.addEventListener('click', (event) => {
                event.preventDefault();
                this.alertClass.hide(this.alertBox);
            });
            if (!this.option.persistent) {
                let alertTimeout = setTimeout(() => {
                    this.alertClass.hide(this.alertBox);
                    clearTimeout(alertTimeout);
                }, this.option.closeTime);
            }
        }
        return this;
    };

    onClick(runnable) {
        this.alertBox.onclick = runnable;
    }

    hide(alertBox) {
        this.alertBox.classList.add('hide');
        let disperseTimeout = setTimeout(() => {
            this.alertBox.parentNode.removeChild(this.alertBox);
            clearTimeout(disperseTimeout);
            if (this.onTimeout != null) this.onTimeout();
        }, 500);
    };
};
