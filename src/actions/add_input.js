import deleteForm from './dell_form';
import { addFormToDB, editContent } from "./data_base";

let newID = 0,
    mainSection,
    actuallID,
    parentID,
    actuallQ,
    actuallType,
    condition,
    conditionType,
    loadObj,
    IDArray = [];

export default function addInput(input, type) {
    loadObj = input;
    let idArrayObj = Array.from(document.querySelectorAll('*[id]'));

    IDArray = idArrayObj.map(element => { return element.id });
    if (type == "add") {
        if (actuallID == undefined)
            actuallID = 0;
        else
            actuallID = input;
    }
    else if (type == "load") {
        actuallID = loadObj.ID;
        actuallQ = loadObj.question;
        actuallType = loadObj.type;
        condition = loadObj.condition;
        conditionType = loadObj.condition_type;
        const leng = actuallID.length - 2;
        parentID = actuallID.slice(0, leng);
    }

    // helper functions

    const newElement = (name) => {
        return (document.createElement(name));
    }

    const innerHTML = (element, text) => {
        return (element.innerHTML = text)
    }

    const appendChild = (parent, child) => {
        return (parent.appendChild(child))
    }

    if (actuallID == 0)
        mainSection = document.querySelector("section");
    else
        mainSection = document.getElementById(`${actuallID}`);

    if (type == "load") {

        if (parentID) {
            mainSection = document.getElementById(`${parentID}`);
        }
        else {
            mainSection = document.querySelector("section");
        }
    }

    // adding form elements 


    const divForm = newElement("div");
    appendChild(mainSection, divForm);

    const newForm = newElement("form");
    appendChild(divForm, newForm);


    if (actuallID != 0 && type == "add" || parentID != "" && type == "load") {

        const prefixC = newElement("span");
        appendChild(newForm, prefixC);
        prefixC.innerHTML = "Condition";

        const inputConText = newElement("input");
        appendChild(newForm, inputConText);
        inputConText.addEventListener("change", function () { editContent(this.parentElement.parentElement.id, "condition", this.value) });
        inputConText.required = true;
        const inputCon = newElement("select");
        appendChild(newForm, inputCon);
        inputCon.required = true;

        const optionC1 = newElement("option");
        innerHTML(optionC1, "Equals");
        appendChild(inputCon, optionC1);

        const optionC2 = newElement("option");
        innerHTML(optionC2, "Greater than");
        appendChild(inputCon, optionC2);

        const optionC3 = newElement("option");
        innerHTML(optionC3, "Less than");
        appendChild(inputCon, optionC3);

        const br = newElement("br");
        appendChild(newForm, br);

        inputCon.addEventListener("change", function () { editContent(this.parentElement.parentElement.id, "condition_type", this.value) });

        if (type == "load") {
            inputConText.setAttribute("type", "text");
            inputConText.setAttribute("value", condition);
            inputCon.value = conditionType;

        }
    }

    const prefixQ = newElement("span");
    appendChild(newForm, prefixQ);
    prefixQ.innerHTML = "Question";

    const inputQ = newElement("input");
    appendChild(newForm, inputQ);
    const br1 = newElement("br");
    appendChild(newForm, br1);
    inputQ.required = true;

    const prefixT = newElement("span");
    appendChild(newForm, prefixT);
    prefixT.innerHTML = "Type";

    const inputType = newElement("select");
    appendChild(newForm, inputType);
    inputType.required = true;
    const br2 = newElement("br");
    appendChild(newForm, br2);
    const optionT1 = newElement("option");
    innerHTML(optionT1, "Text");
    appendChild(inputType, optionT1);
    optionT1.value = "Text";

    const optionT2 = newElement("option");
    innerHTML(optionT2, "Number");
    appendChild(inputType, optionT2);
    optionT2.value = "Number";

    const optionT3 = newElement("option");
    innerHTML(optionT3, "Yes/No");
    appendChild(inputType, optionT3);
    optionT3.value = "Yes/No";

    const addSIButton = newElement("button");
    innerHTML(addSIButton, "Add Sub-Input");
    appendChild(divForm, addSIButton);

    const addDelButton = newElement("button");
    innerHTML(addDelButton, "Delete");
    appendChild(divForm, addDelButton);

    if (type == "load") {
        inputQ.setAttribute("type", "text");
        inputQ.setAttribute("value", actuallQ);
        inputType.value = actuallType;


    }


    //generating new form ID

    const isExist = (element) => {
        return element == newID
    }
    const serchingForID = () => {
        return IDArray.find(isExist)
    }
    const chosingIndex = () => {
        let i = 1;
        let s = 0;
        do {
            if (actuallID == 0) {
                newID = i;
            }
            else {
                newID = `${actuallID}_${i}`;
            }

            isExist();
            s = serchingForID();
            i++
        }
        while (s != undefined);
    }
    chosingIndex();

    if (type == "load")
        newID = actuallID;

    addSIButton.addEventListener("click", function () { addInput(this.parentElement.id, "add") });
    addDelButton.addEventListener("click", function () { deleteForm(this.parentElement.id, "add") });
    inputQ.addEventListener("change", function () { editContent(this.parentElement.parentElement.id, "question", this.value) });
    inputType.addEventListener("change", function () { editContent(this.parentElement.parentElement.id, "type", this.value) });

    divForm.id = newID;
    if (type == "add")
        addFormToDB(newID);

    divForm.classList.add("form");
}

