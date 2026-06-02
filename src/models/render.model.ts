import { getClass } from "../components/class.service";
import type Class from "./class.model";
import type Character from "./character.model";
import { deleteCharacter } from "../components/character.service";

const cards = document.getElementById("cards") as HTMLDivElement;

export async function renderCard(character: Character) {
    const card = document.createElement('div');
    card.classList.add("col-sm-6", "col-md-3", "kartya");
    card.innerHTML = `
        <div class="card h-100">
            <div class="card-header" data-bs-toggle="modal" data-bs-target="#${character.id}Modal">
                <h3 class="card-title">${character.name}</h3>
                <h6 class="card-subtle mb-0">${(await getClass(character.class_id) as Class).name}</h6>
            </div>
            <div class="card-body">
                <p class="card-text my-0">Armor Class: ${character.ac}</p>
                <p class="card-text mt-1 mb-3">Health Points: ${character.hp}</p>
                <button class="btn btn-primary btn-warning">Edit</button>
                <button class="btn btn-primary btn-danger">Delete</button>
            </div>
        </div>
    `;
    (card.querySelector(".btn-danger") as HTMLButtonElement).addEventListener('click', async () => {
        if (confirm("Are you sure to want to delete the character") && character.id != undefined)
            await deleteCharacter(character.id);
    });

    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade')
    modal.id = `${character.id}Modal`;
    modal.tabIndex = -1;
    modal.setAttribute('aria-labelledby', `${character.id}ModalLabel`);
    modal.ariaHidden = "true";

    modal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="${character.id}ModalLabel">${character.name} (${((await getClass(character.class_id)).name)})</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="my-1">Armor Class: ${character.ac}</p>
                <p class="my-1">Health Points: ${character.hp}</p>
                <p class="my-1">Strength: ${character.strength}</p>
                <p class="my-1">Dexterity: ${character.dexterity}</p>
                <p class="my-1">Constitution: ${character.constitution}</p>
                <p class="my-1">Intelligence: ${character.intelligence}</p>
                <p class="my-1">Wisdom: ${character.wisdom}</p>
                <p class="my-1">Charisma: ${character.charisma}</p>
            </div>
        </div>
    </div>`;

    card.appendChild(modal);
    cards.appendChild(card);
}

export async function renderClass(characterClass: Class) {
    
}