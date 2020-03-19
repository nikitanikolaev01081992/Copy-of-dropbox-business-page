//logic for header
// let header = document.getElementsByTagName("header")[0];
let bgElem = document.querySelector(".head-background");
let clsBgElemActive = "head-background_active";
let btnElem = document.querySelector(".button-try");
let clsBtnBlue = "button-try_blue";

document.addEventListener("scroll", () => {
    if (window.pageYOffset > 40) {
        bgElem.classList.add(clsBgElemActive);
        btnElem.classList.add(clsBtnBlue);
    } else {
        bgElem.classList.remove(clsBgElemActive);
        btnElem.classList.remove(clsBtnBlue);
    }
});

//classes for section Faq questions
class ListOfFaqQuestions {
    list = [];

    constructor(domObject, arrayOfQuestions) {
        this.domLink = domObject;
        this.list = Array.prototype.map.call(arrayOfQuestions, element => {
            return new FaqQuestion(element, "faq-item__text_active");
        });

        this.domLink.addEventListener("click", evt => {
            this.handleClick(evt);
        });
    }

    handleClick(event) {
        this.list.forEach(element => {
            if (!event.target.parentElement.classList.contains("faq-item__button") && !event.target.classList.contains("faq-item__button")) return;

            element.button.handleClick(event, element);
        });
    }
}

class FaqQuestion {
    constructor(domQuestion, cssClass) {
        this.domLink = domQuestion;
        this.cssClass = cssClass;

        this.text = new Text(this.domLink.querySelector(".faq-item__text"), this);
        this.button = new Button(this.domLink.querySelector(".faq-item__button"), this);
    }
}

class Button {
    constructor(button, container) {
        this.domLink = button;
        this.container = container;

        // this.domLink.addEventListener("click", evt => {
        //     this.handleClick(evt, this.container);
        // });
    }

    handleClick(evt, container) {
        if (this.domLink.contains(evt.target)) {
            this.domLink.querySelector(".faq-item__arrow").classList.toggle("faq-item__arrow_active");
            container.text.handleEvent();
        } else {
            container.text.removeClass();
            this.domLink.querySelector(".faq-item__arrow").classList.remove("faq-item__arrow_active");
        }
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

//modal window for changing lang
let btnOpenLangWindow = document.querySelector(".language-change__button");
let btnCloseLangWindow = document.querySelector(".modal-lang-window__close-button");
let langWindow = document.querySelector(".modal-lang-window");
let classLangWindowActive = "modal-lang-window_active";

let toogleLangWindow = event => {
    langWindow.classList.toggle(classLangWindowActive);
    document.body.classList.toggle("body_no-scroll");
};

btnOpenLangWindow.addEventListener("click", toogleLangWindow);
btnCloseLangWindow.addEventListener("click", toogleLangWindow);
