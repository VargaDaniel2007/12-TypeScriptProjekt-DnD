import type Class from "../models/class.model";
import type Character from "../models/character.model";

const classUrl = "http://localhost:3241/classes";
const charUrl = "http://localhost:3241/characters";

export async function getCharactersClass(charId: string): Promise<Class> {
    //A karakterhez megszerzi Class-át
    const char: Character = await fetch(`${charUrl}/${charId}`, {method: "GET"}).then(res => res.json());

    const cl: Class = await fetch(`${classUrl}/${char.class_id}`, {method: "GET"}).then(res => res.json());
    return cl;
}