import type Character from "../types/character.type";

const url = "http://localhost:3241/characters";

export async function getCharacterList(): Promise<Character[]> {
    const response = await fetch(url);
    if(!response.ok){
        //Sikertelen lekérés -> TODO: később csinálni vele valami többet?
        console.error("HTTP error:", response.status);
        return []
    }
    return await response.json();
}

export async function getCharacter(id: string): Promise<Character> {
    const response = await fetch(`${url}/${id}`, {method: "GET"});
    return await response.json();
}

export async function createCharacter(newChar: Character): Promise<Character> {
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newChar)
    });
    return await response.json();
}

export async function deleteCharacter(id: string): Promise<void> {
    const response = await fetch(`${url}/${id}`, {method: "DELETE"});
    if(!response.ok){
        //Delete sikertelen -> TODO: csinálni valamit?
    }
}

export async function updateCharacter(id: string, updatedChar: Character): Promise<Character> {
    const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedChar)
    });
    return await response.json();
}