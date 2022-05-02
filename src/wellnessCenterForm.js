import Form from "./Form"
import FormBuilder from "./FormBuilder"
import wellnessCenterQualtrics from "./formWriters/wellnessCenterQualtrics"

export const wellnessCenterForm = () => {
    return new Form(element => {
        const fb = new FormBuilder(element);
        fb.createHeading("Welcome");
        fb.createParagraph("You will need to load your dataset before continuing");
        const {div} = fb.createFileInput("Select form type", "formType", "formType")
        const loadExcel = document.createElement("button");
        loadExcel.innerText = "Load Excel Spreadsheet";
        div.appendChild(loadExcel);
        const starIdInput = fb.createInput("Search for StarID", "queryInput", "queryInput", "text");
        const datalist = document.createElement("datalist");
        datalist.id = "query";
        starIdInput.div.appendChild(datalist);
        fb.createRadio("Type of person", "type", [
            {
                value: "student", id: "studentRadio", text: "Student"
            },
            {
                value: "employee", id: "employeeRadio", text: "Employee"
            },
            {
                value: "communityMember", id: "communityMemberRadio", text: "Community Member"
            }
        ]);
        fb.createInput("Enter date:", "date", "date", "date");
        const dateInput = fb.createInput("Month:", "month", "month", "text");
        dateInput.input.disabled = true;
        fb.createButton("Submit", "submit");
        fb.createButton("Clear", "clear");

    }, "Wellness Center", wellnessCenterQualtrics())
}

export default wellnessCenterForm;