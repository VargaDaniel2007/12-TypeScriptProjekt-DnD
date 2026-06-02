import type Class from "./models/class.model";
import type Character from "./models/character.model";
import { getCharacterList } from "./components/character.service";
import { getClasses } from "./components/class.service";
import { renderCard, renderClass } from "./models/render.model";

let Classes: Class[] = [];
let Characters: Character[] = [];
const main = document.getElementById("main") as HTMLDivElement;
const cards = document.getElementById("cards") as HTMLDivElement;
let selected = "charButton";

document.querySelectorAll('.select-button').forEach(e => {
    const element = e as HTMLInputElement;
    element.addEventListener('click', () => {
        selected = element.name;
        render();
    })
});

async function load() {
    Classes = await getClasses();
    Characters = await getCharacterList();
    render();
}

function render() {
    cards.innerHTML = "";
    selected == "charButton" ? Characters.forEach(renderCard) : Classes.forEach(renderClass);
}


load();