//logic for button to open navigation on medium/small screens
class Header {
    domLink = document.querySelector("header");
    openBtnCssClassInitial = "button-open-nav";
    openBtnCssClassActive = "button-open-nav_active";
    navContainerCssClassInitial = "navigation-container";
    navContainerCssClassActive = "navigation-container_active";
    bgElemClassInitial = "head-background";
    bgElemClassActive = "head-background_active";
    btnTryClassInitial = "button-try";
    btnTryClassActive = "button_blue";
    dropDownContainerClassInitial = "navigation__item-with-button";
    dropDownContainerClassActive = "navigation__item-with-button_active";
    // dropDownElemClassInitial = "navigation__dropbox";
    // dropDownElemClassActive = "navigation__dropbox_active";

    constructor() {
        const innerElemJSClass = class {
            isActive = false;
            constructor(cssClassInitial, cssClassActive) {
                this.cssClassInitial = cssClassInitial;
                this.cssClassActive = cssClassActive;
                this.domLink = document.querySelector("." + this.cssClassInitial);
            }

            handleEvent() {
                this.domLink.classList.toggle(this.cssClassActive);
                if (this.domLink.classList.contains(this.cssClassActive)) {
                    this.isActive = true;
                } else {
                    this.isActive = false;
                }
            }

            changeElemStatus(isActive) {
                if (isActive) {
                    this.domLink.classList.add(this.cssClassActive);
                    this.isActive = true;
                } else {
                    this.domLink.classList.remove(this.cssClassActive);
                    this.isActive = false;
                }
            }
        };

        const innerBgElemJSClass = class extends innerElemJSClass {
            handleScroll() {
                if (window.pageYOffset > 40) {
                    this.changeElemStatus(true);
                } else {
                    this.changeElemStatus(false);
                }
            }
        };

        const innerMultipleElemJSClass = class extends innerElemJSClass {
            constructor(cssClassInitial, cssClassActive, index) {
                super(cssClassInitial, cssClassActive);
                this.domLink = document.querySelectorAll("." + this.cssClassInitial)[index];
            }
        };

        this.openBtn = new innerElemJSClass(this.openBtnCssClassInitial, this.openBtnCssClassActive);
        this.navContainer = new innerElemJSClass(this.navContainerCssClassInitial, this.navContainerCssClassActive);

        const tempMap = Array.prototype.map;
        this.dropDownContainers = tempMap.call(document.querySelectorAll("." + this.dropDownContainerClassInitial), (elem, index) => {
            return new innerMultipleElemJSClass(this.dropDownContainerClassInitial, this.dropDownContainerClassActive, index);
        });
        // this.dropDownElems = tempMap.call(document.querySelectorAll("." + this.dropDownElemClassInitial), (elem, index) => {
        //     return new innerMultipleElemJSClass(this.dropDownElemClassInitial, this.dropDownElemClassActive, index);
        // });

        this.bgElem = new innerBgElemJSClass(this.bgElemClassInitial, this.bgElemClassActive);
        this.btnTry = new innerBgElemJSClass(this.btnTryClassInitial, this.btnTryClassActive);

        //add event handlers
        document.addEventListener("scroll", () => {
            this.bgElem.handleScroll();
            this.btnTry.handleScroll();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1365) {
                document.body.classList.remove("body_no-scroll");
                this.openBtn.changeElemStatus(false);
                this.navContainer.changeElemStatus(false);
                this.bgElem.changeElemStatus(false);
                this.btnTry.changeElemStatus(false);
                this.dropDownContainers.forEach((elem) => {
                    elem.changeElemStatus(false);
                });

                document.dispatchEvent(new Event("scroll"));
            }
        });

        this.domLink.addEventListener("click", (event) => {
            this.handleClick(event);
        });
    }

    handleClick(event) {
        const targetOpenBn = event.target.closest("." + this.openBtnCssClassInitial);
        const targetDropDown = event.target.closest("." + this.dropDownContainerClassInitial + " button");

        if (targetOpenBn) {
            document.body.classList.toggle("body_no-scroll");
            this.openBtn.handleEvent();
            this.navContainer.handleEvent();
            this.bgElem.changeElemStatus(this.openBtn.isActive);
            this.btnTry.changeElemStatus(this.openBtn.isActive);

            if (!this.openBtn.isActive) {
                this.dropDownContainers.forEach((elem) => {
                    elem.changeElemStatus(false);
                });
                // this.dropDownElems.forEach((elem) => {
                //     elem.changeElemStatus(false);
                // });
            }
        } else if (targetDropDown) {
            let target;

            for (let i = 0; i < this.dropDownContainers.length; i++) {
                if (this.dropDownContainers[i].domLink.contains(targetDropDown)) {
                    target = this.dropDownContainers[i];
                    target.handleEvent();
                    break;
                }
            }

            this.dropDownContainers.forEach((elem) => {
                if (elem !== target) {
                    elem.changeElemStatus(false);
                }
            });
        }
    }
}

let navigationMenu = new Header();

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

        this.inputsWithRadio.forEach((input) => {
            input.addEventListener("click", this.handleEvent.bind(this));
        });
    }

    handleEvent(event) {
        this.inputsWithRadio.forEach((elem) => {
            elem.classList.remove(this.classInputChecked);
        });
        event.currentTarget.classList.add(this.classInputChecked);

        this.changeTextPrice(event.currentTarget.dataset.plan);
    }

    changeTextPrice(plan) {
        let newState = plan[0].toUpperCase() + plan.slice(1);
        let oldState = plan === "monthly" ? "Yearly" : "Monthly";

        this["textPrice" + oldState].forEach((elem) => {
            elem.classList.remove(this.classPriceActive);
        });

        this["textPrice" + newState].forEach((elem) => {
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
        this.list = Array.prototype.map.call(arrayOfQuestions, (element) => {
            return new FaqQuestion(element, "faq-item__text_active");
        });

        this.domLink.addEventListener("click", (evt) => {
            this.handleClick(evt);
        });
    }

    handleClick(event) {
        this.list.forEach((element) => {
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
        this.getData().then((data) => {
            this.dataOfItems = data;

            let recursiveTimeout = () => {
                this.changeActiveItem();
                setTimeout(recursiveTimeout, 5000);
            };
            recursiveTimeout();
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
    progressBarClass = "customer-review__progress-bar";

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
        let progressBar = this.domElem.querySelector("." + this.progressBarClass);
        if (progressBar) {
            this.domElem.removeChild(progressBar);
        }

        let newProgressBar = document.createElement("div");
        newProgressBar.classList.add(this.progressBarClass);
        this.domElem.append(newProgressBar);
    }
}

let reviewsComponent = new Component_Reviews();

//modal window for changing lang
let btnOpenLangWindow = document.querySelector(".language-change__button");
let btnCloseLangWindow = document.querySelector(".modal-lang-window__close-button");
let langWindow = document.querySelector(".modal-lang-window");
let classLangWindowActive = "modal-lang-window_active";

let toogleLangWindow = (event) => {
    langWindow.classList.toggle(classLangWindowActive);
    document.body.classList.toggle("body_no-scroll");
};

btnOpenLangWindow.addEventListener("click", toogleLangWindow);
btnCloseLangWindow.addEventListener("click", toogleLangWindow);
