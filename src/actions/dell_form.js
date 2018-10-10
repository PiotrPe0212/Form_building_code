import { delFormFromDB } from './data_base';
export default function deleteForm(input) {

    let actuallID = input;

    const delElement = document.getElementById(`${actuallID}`);

    let insideElements = Array.from(delElement.getElementsByClassName("form"));

    insideElements = insideElements.map(element => {
        return element = element.id;

    })

    insideElements.push(actuallID);

    delFormFromDB(insideElements);

    while (delElement.hasChildNodes()) {
        delElement.removeChild(delElement.firstChild);
    }
    delElement.remove();
}