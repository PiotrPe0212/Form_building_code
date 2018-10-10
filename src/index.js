import style from "./main.css";
import addInput from "./actions/add_input";
import { openDb } from "./actions/data_base";


const lowestButton = document.querySelector("section").querySelector("button");

lowestButton.addEventListener("click", function () {
    addInput(this.parentElement.id, "add");

});

document.addEventListener("DOMContentLoaded", openDb);

