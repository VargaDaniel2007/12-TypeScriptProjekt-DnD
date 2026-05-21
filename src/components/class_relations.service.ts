import type Class from "../types/class.type";
import type Character from "../types/character.type";

const classUrl = "http://localhost:3000/classes";
const charUrl = "http://localhost:3000/characters";

export async function getCharactersClass(charId: string): Promise<Class> {
    //A karakterhez megszerzi Class-át
    const char: Character = await fetch(`${charUrl}/${charId}`, {method: "GET"}).then(res => res.json());

    const cl: Class = await fetch(`${classUrl}/${char.class_id}`, {method: "GET"}).then(res => res.json());
    return cl;
}