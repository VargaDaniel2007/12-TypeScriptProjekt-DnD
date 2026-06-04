import type Class from "./models/class.model";
import type Character from "./models/character.model";
import { createCharacter, getCharacterList, updateCharacter } from "./components/character.service";
import { createClass, getClasses, updateClass } from "./components/class.service";
import { renderCard, renderClass, sortItems } from "./models/render.model";

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

export async function load() {
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
    (document.getElementById('newClassModal-form') as HTMLFormElement).reset();
    document.getElementById('newChar-save-btn')!.innerText = 'Create character';
    document.getElementById('newClass-save-btn')!.innerText = 'Create class';
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
        await updateCharacter(id, char);
        
    }
    else{
        await createCharacter(char);
    }

    document.getElementById('newChar-save-btn')!.dataset.id = "";
    await load();
});

document.getElementById('newClass-save-btn')!.addEventListener('click', async (e) => {
    let charClass:Class = {
        name: (document.getElementById('newClass-name') as HTMLInputElement).value,
        desc: (document.getElementById('newClass-desc') as HTMLInputElement).value,
        hit_die: Number((document.getElementById('newClass-htd') as HTMLInputElement).value),
        actions: (document.getElementById('newClass-action') as HTMLInputElement).value,
        features: (document.getElementById('newClass-features') as HTMLInputElement).value
    }

    const id = (e.target as HTMLButtonElement).dataset.id
    if(id){
        charClass.id = id;
        await updateClass(id, charClass);
    }
    else{
        await createClass(charClass);
    }

    document.getElementById('newClass-save-btn')!.dataset.id = "";
    await load();
});

document.getElementById("sort-by")?.addEventListener("change", sorting);
document.getElementById("sort-order")?.addEventListener("change", sorting);

function sorting() {
    const field = (document.getElementById("sort-by") as HTMLSelectElement).value;
    const order = (document.getElementById("sort-order") as HTMLSelectElement).value as "asc" | "desc";

    Characters = sortItems(Characters, field as keyof Character, order);
    console.log(Characters);

    render();
};

await load();
