import loadData from './load_data';
import conditionValidation from './condition_validation';
let db;
const dbName = "FormDatabase";
const storeName = "FormBuilder";
let version = 1;
export function openDb() {
    let openRequest = indexedDB.open(dbName, version);

    openRequest.onsuccess = function (event) {
        db = event.target.result;
        getExistingValues();
        compliteFunction();
    };
    openRequest.onerror = function (event) {
        errorFunction(event);
    };


    openRequest.onupgradeneeded = function (event) {
        const thisDb = event.target.result;
        const store = thisDb.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        store.createIndex("ID", "ID", { unique: false });
        store.createIndex("question", "question", { unique: false });
        store.createIndex("type", "type", { unique: false });
        store.createIndex("condition", "condition", { unique: false });
        store.createIndex("conditionType", "conditionType", { unique: false });
    }

}
let transaction;
const transactionFunction = () => {
    if (db == undefined) {
        console.log("wait");
    }
    else {
        return (
            transaction = db.transaction(storeName, "readwrite"))
    }
};
let store;
const storeFunction = () => {
    if (db == undefined) {
        console.log("wait");
    }
    else {
        return (
            store = transaction.objectStore(storeName))
    }
}
let newForm = { ID: "0", question: "", type: "", condition: "", condition_type: "" };

export function addFormToDB(id) {
    newForm.ID = `${id}`;
    transactionFunction();
    storeFunction();

    transaction.oncomplete = function (event) {
        compliteFunction();
    };

    transaction.onerror = function (event) {
        errorFunction(event);
    };

    const request = store.add(newForm);
    request.onsuccess = function (event) {
        compliteFunction();
    }
    request.onerror = function (event) {
        errorFunction(event);
    }
}
export function delFormFromDB(formId) {
    transactionFunction();
    storeFunction();

    store.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;
        let i = 0;
        if (cursor) {
            formId.forEach(element => {
                if (cursor.value.ID == element) {
                    var request = cursor.delete();
                    request.onsuccess = function () {
                        compliteFunction();
                    };
                }
            });
            cursor.continue();
        }
        else {
            compliteFunction();
        }
    };

}
export function editContent(formId, param, value) {
    transactionFunction();
    storeFunction();
    let editElement;

    const index = store.index("ID");
    index.get(`${formId}`).onsuccess = function (event) {
        editElement = event.target.result;
        switch (param) {
            case "question":
                editElement.question = value;
                break;
            case "type":
                editElement.type = value;
                conditionValidation(formId, value);
                break;
            case "condition":
                editElement.condition = value;

                break;
            case "condition_type":
                editElement.condition_type = value;
                break;
        }
        const request = store.put(editElement)
        request.onsuccess = function (event) {
            compliteFunction();
        };
        request.onerror = function (event) {
            errorFunction(event);
        }
    }
    index.get(formId).onerror = function (event) {
        errorFunction(event);
    }

}
let existingForms = [];
export function getExistingValues() {
    transactionFunction();
    storeFunction();

    store.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {
            existingForms.push(cursor.value);
            cursor.continue();
        }
        else {
            loadData(existingForms);
        }
    };

}


const errorFunction = (event) => {
    console.log(`Error ${event.errorCode}`)
}
const compliteFunction = () => {
    console.log("Everything is fine. All done!")
}