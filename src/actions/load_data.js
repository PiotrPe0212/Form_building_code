import addInput from './add_input';
import conditionValidation from './condition_validation';
export default function loadData(dbData) {
    const dbDataArr = dbData;
    dbDataArr.forEach(element => {
        addInput(element, "load")

    });
    dbDataArr.forEach(element => {
        const id = element.ID;
        const text = element.type;
        conditionValidation(id, text);

    });
}