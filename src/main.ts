import type Class from "./types/class.type";
import type Character from "./types/character.type";
import { getCharacterList } from "./components/character.service";
import { getClasses } from "./components/class.service";

let Classes: Class[] = [];
let Characters: Character[] = [];
const main = document.getElementById("main") as HTMLDivElement;

async function load() {
    Classes = await getClasses();
    Characters = await getCharacterList();
    render();
}

function render() {
    main.innerHTML = "";
    Characters.forEach(renderCard);
}

function renderCard(character: Character) {
    //  <div class="col-sm-6 col-md-3 kartya">
    //     <div class="card h-100">
    //         <div class="card-body">
    //             <h3 class="card-title">Name</h3>
    //             <h6 class="card-subtle">Class</h6>
    //             <div class="row">
    //                 <div class="col-6">
    //                     <p class="card-text">AC:10</p>
    //                 </div>
    //                 <div class="col-6">
    //                     <p class="card-text">HP:10</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    const border = document.createElement('div');
    border.classList.add("col-sm-6", "col-md-3", "kartya");
    const card = document.createElement('div');
    card.classList.add("card", "h-100");
    const body = document.createElement('div');
    body.classList.add("card-body");

    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.innerText = character.name;
    body.appendChild(title);

    const subtle = document.createElement('h6');
    subtle.classList.add('card-subtle');
    subtle.innerText = Classes.find(x => x.id == character.class_id)?.name ?? "unknown";
    body.appendChild(subtle);

    card.appendChild(body);
    border.appendChild(card);
    main.appendChild(border);
}

load();