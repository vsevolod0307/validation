class ValidationField {
    fields = [];

    constructor(fields) {
        this.fields = fields;
    }

    setPattern(type, value) {
        let pattern;
        switch(type) {
            case "email":
                pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
                break;
            case "phone":
                pattern = /^\+?7(\d{10})$/;
                break;
            default:
                console.log("default");
        }

        return pattern.test(value);
    }

    createError(parentElement, valid) {
        const errorElem = parentElement.nextElementSibling;
        const isErrorElem = parentElement.nextElementSibling?.classList.contains("error-text");
        if(!isErrorElem && !valid) {
            const elem = document.createElement("span");
            // не забудьте стилизовать класс error-text
            elem.classList.add("error-text");
            elem.textContent = "некорректные данные";
            parentElement.insertAdjacentElement('afterend', elem);
        }

        if(valid && errorElem?.classList.contains("error-text")) {
            errorElem.remove();
        }
    }

    get isValidFields() {
        return Array.from(this.fields).map(field => {
            return {
                element: field,
                valid: this.setPattern(field.name, field.value)
            }
        });
    }

    validate() {
        this.isValidFields.forEach((field, i) => {
            field.element.addEventListener("input", () => {
                this.createError(field.element, this.isValidFields[i].valid)
            })
        })
    }
}

const inputs = document.querySelectorAll("input");

const validate = new ValidationField(inputs);
validate.validate();
// console.log(validate.isValidFields)