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

//logic for arrow button in section
let arrowBtn = document.querySelector(".section__arrow-button");
arrowBtn.addEventListener("click", () => {
    let elemForScroll = document.querySelector(".section-plans");
    if (elemForScroll) {
        elemForScroll.scrollIntoView();
    }
});

//logic for radio buttons in section plans
class PlanChanger {
    inputsWithRadio = document.querySelectorAll(".inputs-with-radio__item");
    textPriceMonthly = document.querySelectorAll(".item__price-monthly");
    textPriceYearly = document.querySelectorAll(".item__price-yearly");
    classInputChecked = "inputs-with-radio__item_checked";
    classPriceActive = "item__price_active";

    constructor() {
        this.handleEvent({ currentTarget: this.inputsWithRadio[0] });

        this.inputsWithRadio.forEach(input => {
            input.addEventListener("click", this.handleEvent.bind(this));
        });
    }

    handleEvent(event) {
        this.inputsWithRadio.forEach(elem => {
            elem.classList.remove(this.classInputChecked);
        });
        event.currentTarget.classList.add(this.classInputChecked);

        this.changeTextPrice(event.currentTarget.dataset.plan);
    }

    changeTextPrice(plan) {
        let newState = plan[0].toUpperCase() + plan.slice(1);
        let oldState = plan === "monthly" ? "Yearly" : "Monthly";

        this["textPrice" + oldState].forEach(elem => {
            elem.classList.remove(this.classPriceActive);
        });

        this["textPrice" + newState].forEach(elem => {
            elem.classList.add(this.classPriceActive);
        });
    }
}

let planChanger = new PlanChanger();

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

//section reviews - text changing
class Component_Reviews {
    items = [];
    currActiveItem;
    indexOfActiveItem = -1;
    textItem;
    classOfItems = "reviews__item";
    classForActiveItem = "reviews__item_active";
    urlToData = "asserts/customer-reviews.json";
    dataOfItems; //array of objects {img_src, text, author}, all fields are text

    constructor() {
        this.items = document.querySelectorAll("." + this.classOfItems);
        this.textItem = new Customer_Review();

        //get data from json
        this.getData().then(data => {
            this.dataOfItems = data;

            this.changeActiveItem();
            setInterval(this.changeActiveItem.bind(this), 5000);
        });
    }

    changeActiveItem() {
        if (this.currActiveItem) {
            this.currActiveItem.classList.remove(this.classForActiveItem);
        }

        ++this.indexOfActiveItem;
        if (this.indexOfActiveItem == this.items.length) {
            this.indexOfActiveItem = 0;
        }

        //change image and text
        this.textItem.changeData(this.dataOfItems[this.indexOfActiveItem]);

        //change active elem
        this.currActiveItem = this.items[this.indexOfActiveItem];
        this.currActiveItem.classList.add(this.classForActiveItem);
    }

    async getData() {
        const response = await fetch(this.urlToData);
        const data = await response.json();

        return data;
    }
}

class Customer_Review {
    domElem = document.querySelector(".customer-review");
    imgElem = document.querySelector(".customer-review__image");
    textElem = document.querySelector(".customer-review__text");
    authorElem = document.querySelector(".customer-review__author");
    progressBarElem = document.querySelector(".customer-review__progress-bar");
    classWithAnimation = "customer-review__progress-bar_animated";

    changeData(newData) {
        this.restartProgressBar();
        this.changeImg(newData.img_src);
        this.changeText(newData.text);
        this.changeAuthor(newData.author);
    }

    changeImg(url) {
        this.imgElem.src = url;
    }

    changeText(text) {
        this.textElem.innerHTML = text;
    }

    changeAuthor(author) {
        this.authorElem.innerHTML = author;
    }

    restartProgressBar() {
        this.progressBarElem.classList.remove(this.classWithAnimation); //remove animation, it should start with new changes
        this.progressBarElem.classList.add(this.classWithAnimation);
    }
}

let reviewsComponent = new Component_Reviews();

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
