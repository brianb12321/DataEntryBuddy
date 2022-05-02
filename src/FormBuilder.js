export default class FormBuilder {
    element;

    constructor(element) {
        this.element = element;
    }
    createHeading(text) {
        const heading = document.createElement("h1");
        heading.innerText = text;
        this.element.appendChild(heading);
        return heading;
    }
    createParagraph(text) {
        const paragraph = document.createElement("p");
        paragraph.innerText = text;
        this.element.appendChild(paragraph);
        return paragraph;
    }
    createFormGroup() {
        let div = document.createElement("div");
        div.classList.add("form-group");
        return div;
    }
    createLabel(label, name) {
        let labelElement = document.createElement("label");
        labelElement.innerText = label;
        labelElement.htmlFor = name;
        return labelElement;
    }
    createInput(label, name, id, type="text") {
        let div = this.createFormGroup();
        let labelElement = this.createLabel(label, name);
        let input = document.createElement("input");
        input.type = type;
        input.name = name;
        input.id = id;
        div.appendChild(labelElement);
        div.appendChild(input);
        this.element.appendChild(div);
        return {
            div,
            labelElement,
            input
        };
    }
    createFileInput(label, name, id, accept) {
        const returnObj = this.createInput(label, name, id, "file");
        returnObj.input.accept = accept;
        return returnObj;
    }
    createSelect(label, name, id) {
        const div = this.createFormGroup();
        const labelElement = this.createLabel(label, name);
        const select = document.createElement("select");
        select.name = name;
        select.id = id;
        div.appendChild(labelElement);
        div.appendChild(select);
        this.element.appendChild(div);
        return {
            div, labelElement, select
        };
    }
    createRadio(label, name, options) {
        let radioElements = [];
        const div = this.createFormGroup();
        const labelElement = this.createLabel(label, name);
        div.appendChild(labelElement);
        for(let option of options) {
            const radioElement = document.createElement("input");
            radioElement.type = "radio";
            radioElement.name = name;
            radioElement.id = option.id;
            radioElement.value = option.value;
            radioElement.innerText = option.text;
            div.appendChild(radioElement);
            radioElements.push(radioElement);
        }

        return {
            div,
            labelElement,
            radioElements
        };
    }
    createButton(text, id) {
        const button = document.createElement("button");
        button.innerText = text;
        button.id = id;
        this.element.appendChild(button);
        return button;
    }
}