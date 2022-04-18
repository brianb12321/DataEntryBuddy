import * as xlsx from 'xlsx';

const loadExcel = document.getElementById('loadExcel');
const queryInput = document.querySelector("#queryInput");
const queryList = document.querySelector('#query');
const date = document.querySelector('#date');
const month = document.querySelector('#month');
const submit = document.querySelector('#submit');
const clear = document.querySelector("#clear");
const [studentRadio, employeeRadio, communityRadio] = [
    document.querySelector("#studentRadio"),
    document.querySelector("#employeeRadio"),
    document.querySelector("#communityRadio")
];

function convertFullNameToFirstAndLast(name) {
    const nameArray = name.match(/\S+/g) || [];
    const firstName = nameArray[0];
    nameArray.shift();
    const lastName = nameArray.join(" ");
    return [firstName, lastName];
}

function updateQueryList(row) {
    const selectItem = document.createElement('option');
    selectItem.value = row["StarID"];
    selectItem.innerText = `${row["StarID"]} - ${row["FirstName"]} ${row["LastName"]}`;
    queryList.appendChild(selectItem);
}
function radioButtonChanged(evt) {
    chrome.storage.local.set({
        "viewStatePersonType": evt.target.value
    });
}

chrome.storage.local.get(["viewState", "viewStateRows", "viewStatePersonType"], obj => {
    const viewState = obj.viewState;
    const viewStateRows = JSON.parse(obj.viewStateRows);
    if(viewStateRows !== undefined) {
        for(let rowId in viewStateRows) {
            const row = viewStateRows[rowId];
            if(row["StarID"] !== "") {
                const [firstName, lastName] = convertFullNameToFirstAndLast(row["FullName"]);
                row["FirstName"] = firstName;
                row["LastName"] = lastName;
                updateQueryList(row);
            }
        }
    }
    if(viewState !== undefined) {
        if(viewState.selectedRowStarID !== undefined) {
            queryInput.value = viewState.selectedRowStarID;
        }
        if(viewState.date !== undefined) {
            date.value = viewState.date;
        }
        month.value = new Date(date.value).getMonth() + 1;
    }
    if(obj.viewStatePersonType !== undefined) {
        switch(obj.viewStatePersonType) {
            case "student":
                studentRadio.click();
            break;
            case "employee":
                employeeRadio.click();
            break;
            case "communityMember":
                communityRadio.click();
            break;
        }
    }
});

loadExcel.addEventListener("click", (evt) => {
    evt.preventDefault();
    const reader = new FileReader();
    reader.onload = (evt) => {
        const bstr = reader.result.toString();
        const workbook = xlsx.read(bstr, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_row_object_array(worksheet);
        let dataDict = {};
        queryList.textContent = "";
        for(let row of data) {
            dataDict[row["StarID"]] = row;
            const [firstName, lastName] = convertFullNameToFirstAndLast(row["FullName"]);
            row["FirstName"] = firstName;
            row["LastName"] = lastName;
            updateQueryList(row);
        }
        chrome.storage.local.set({"viewStateRows": JSON.stringify(dataDict)});
    };
    reader.readAsBinaryString(document.getElementById('file').files[0]);
});

queryInput.addEventListener("change", (evt) => {
    chrome.storage.local.set({"viewState": {
        "selectedRowStarID": queryInput.value,
        "date": date.value
     }});
});
date.addEventListener("change", (evt) => {
    chrome.storage.local.set({"viewState": {
        "selectedRowStarID": queryInput.value,
        "date": date.value
     }});
     month.value = new Date(date.value).getMonth() + 1;
})

submit.addEventListener("click", async (evt) => {
    evt.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: submitQualtricsForm
    });
});
studentRadio.addEventListener("click", radioButtonChanged);
employeeRadio.addEventListener("click", radioButtonChanged);
communityRadio.addEventListener("click", radioButtonChanged);

clear.addEventListener("click", () => {
    chrome.storage.local.clear();
});

function submitQualtricsForm() {
    chrome.storage.local.get(["viewState", "viewStateRows", "viewStatePersonType"], obj => {
        //Get elements

        const viewState = obj.viewState;
        const viewStateRows = JSON.parse(obj.viewStateRows);
        function getIdByMonth(month) {
            return `#QID20-${month}-label`;
        }

        const qStarID = document.getElementById("QR~QID5");
        const qFirstName = document.getElementById("QR~QID3");
        const qLastName = document.getElementById("QR~QID16");
        const qDate = document.getElementById("QR~QID6");
        const qStudent = document.getElementById("QR~QID23~1");
        const qStaff = document.getElementById("QR~QID23~2");
        const qCommunityMember = document.getElementById("QR~QID23~4");
        const qSubmit = document.getElementById("NextButton");

        const currentRow = viewStateRows[viewState.selectedRowStarID];
        qStarID.value = currentRow["StarID"];
        qFirstName.value = currentRow["FirstName"];
        qLastName.value = currentRow["LastName"];
        qDate.value = viewState.date;

        switch(obj.viewStatePersonType) {
            case "student":
                qStudent.click();
            break;
            case "employee":
                qStaff.click();
            break;
            case "communityMember":
                qCommunityMember.click();
            break;
        }
        document.querySelector(getIdByMonth(new Date(viewState.date).getMonth() + 1)).click();
    });
}