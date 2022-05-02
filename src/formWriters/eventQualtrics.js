import { FormWriter } from "../FormWriter";

export const eventQualtrics = () => {
    return new FormWriter("eventQualtrics", "Event", () => {
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
    });
};

export default wellnessCenterQualtrics;