import Form from "./Form"
import FormBuilder from "./FormBuilder"
import wellnessCenterQualtrics from "./formWriters/wellnessCenterQualtrics"

export default wellnessCenterForm = () => {
    return new Form(element => {
        const fb = new FormBuilder(element);
        
    }, "Wellness Center", wellnessCenterQualtrics())
}