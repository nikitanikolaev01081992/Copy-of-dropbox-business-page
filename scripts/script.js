class FaqQuestion {
    constructor(domQuestion, cssClass, domText, domButton) {
        this.domLink = domQuestion;
        this.cssClass = cssClass;
        this.text = new Text(domText, this);
        this.button = new Button(domButton, this);
        
    }

}


class Button {

    constructor(button, container) {
        this.domLink = button;
        this.container = container;

        this.domLink.addEventListener("click", (evt) => {
            this.handleClick(evt, this.container);
        });
    }

    handleClick(evt, container) {
        container.text.handleEvent();
    }


}

class Text {
    constructor(button, container) {
        this.domLink = button;
        this.container = container;
    }

    handleEvent() {
        this.domLink.classList.toggle(this.container.cssClass);
    }
}


let faq1 = new FaqQuestion(
            document.querySelectorAll(".faq-item")[0],
            "faq-item__text_active",
            document.querySelectorAll(".faq-item__text")[0],
            document.querySelectorAll(".faq-item__button")[0],
);