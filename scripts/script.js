class ListOfFaqQuestions {
    list = [];
    
    constructor(domObject, arrayOfQuestions) {
        this.domObject = domObject;
        this.list = Array.prototype.map.call(arrayOfQuestions, element => {
            return new FaqQuestion(element, "faq-item__text_active");
        });
        
        
        this.domObject.addEventListener("click", (evt) => {
            this.handleClick(evt);
        })
    }

    handleClick(event) {
        this.list.forEach(element => {
            if (event.currentTarget !== element.button.domLink) {
                element.text.removeClass();
            }
        });
        
    }
}


class FaqQuestion {
    constructor(domQuestion, cssClass) {
        this.domLink = domQuestion;
        this.cssClass = cssClass;

        this.text = new Text(document.querySelector(".faq-item").querySelector(".faq-item__text"), this);
        this.button = new Button(document.querySelector(".faq-item").querySelector(".faq-item__button"), this);
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

    removeClass() {
        this.domLink.classList.remove(this.container.cssClass);
    }
}




let listOfFaqQuestions = new ListOfFaqQuestions(document.querySelector(".faq-questions"), document.querySelectorAll(".faq-item"));



