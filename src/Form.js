export default class Form {
    name;
    render;
    formWriter;

    constructor(render, name, formWriter) {
        this.render = render;
        this.name = name;
        this.formWriter = formWriter;
    }
}