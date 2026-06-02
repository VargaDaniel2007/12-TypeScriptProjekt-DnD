import type Class from "./models/class.model";
import type Character from "./models/character.model";
import { createCharacter, getCharacterList, updateCharacter } from "./components/character.service";
import { getClasses } from "./components/class.service";
import { renderCard, renderClass } from "./models/render.model";

let Classes: Class[] = [];
let Characters: Character[] = [];
const main = document.getElementById("main") as HTMLDivElement;
const cards = document.getElementById("cards") as HTMLDivElement;
const createBtn = document.getElementById('create-btn') as HTMLButtonElement;
let selected = "charButton";

document.querySelectorAll('.select-button').forEach(e => {
    const element = e as HTMLInputElement;
    element.addEventListener('click', () => {
        selected = element.name;
        createBtn.dataset.bsTarget = selected == 'charButton' ? "#createNewCharacterModal" : "#createNewClassModal"
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

createBtn.addEventListener('click', () => {
    (document.getElementById('newCharModal-form') as HTMLFormElement).reset();
    document.getElementById('newChar-save-btn')!.innerText = 'Create character';
});

document.getElementById('newChar-save-btn')!.addEventListener('click', async () => {

    const className = (document.getElementById('newChar-class') as HTMLInputElement).value
    const classId = (await getClasses()).find(c => c.name == className)!.id;
    let char: Character = {
        name: (document.getElementById('newChar-name') as HTMLInputElement).value,
        class_id: classId ?? "",
        ac: Number((document.getElementById('newChar-ac') as HTMLInputElement).value),
        hp: Number((document.getElementById('newChar-hp') as HTMLInputElement).value),
        strength: Number((document.getElementById('newChar-str') as HTMLInputElement).value),
        dexterity: Number((document.getElementById('newChar-dext') as HTMLInputElement).value),
        intelligence: Number((document.getElementById('newChar-int') as HTMLInputElement).value),
        wisdom: Number(((document.getElementById('newChar-wisd') as HTMLInputElement)).value)
    }
    

    const id = document.getElementById('newChar-save-btn')!.dataset.id

    if(id){
        char.id = id;
        console.log(await updateCharacter(id, char));
        
    }
    else{
        console.log(await createCharacter(char));
    }

    (document.getElementById('newCharModal-form') as HTMLFormElement).reset();

    document.getElementById('newChar-save-btn')!.dataset.id = "";
    await load();
});

load();