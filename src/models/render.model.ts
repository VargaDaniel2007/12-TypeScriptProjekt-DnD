import { getClass } from "../components/class.service";
import type Class from "./class.model";
import type Character from "./character.model";

const cards = document.getElementById("cards") as HTMLDivElement;

export async function renderCard(character: Character) {
    const card = document.createElement('div');
    card.classList.add("col-sm-6", "col-md-3", "kartya");
    card.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <h3 class="card-title">${character.name}</h3>
                <h6 class="card-subtle">${(await getClass(character.class_id) as Class).name}</h6>
                <p class="card-text my-1">Armor Class: ${character.ac}</p>
                <p class="card-text my-1">Health Points: ${character.hp}</p>
                <button class="btn btn-primary btn-warning">Edit</button>
                <button class="btn btn-primary btn-danger">Delete</button>
            </div>
        </div>
    `;

    cards.appendChild(card);
    
}

export async function renderClass(characterClass: Class) {
    
}