export default function conditionValidation(id, value) {
    let newElement;
    let newId;
    let i = 1;
    while (i) {
        newId = `${id}_${i}`;
        newElement = document.getElementById(`${newId}`)
        if (newElement == undefined) {
            break;
        }
        else {
            newElement = newElement.querySelector("input")
            switch (value) {
                case "Yes/No":
                    newElement.pattern = "Yes|No";
                    newElement.title = "Only Yes/No condition"
                    break;
                case "Text":
                    newElement.pattern = "[a-zA-Z -]+"
                    newElement.title = "Letters only"
                    break;
                case "Number":
                    newElement.pattern = "[0-9]+"
                    newElement.title = "Numbers only"
                    break;
            }
            i++;
        }
    }

}