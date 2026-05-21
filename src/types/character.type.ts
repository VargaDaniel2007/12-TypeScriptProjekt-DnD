/*
"characters":[
{
    "id":1,
    "name": "Bob",
    "AC": 10,
    "HP": 6,
    "strength": 10,
    "dexterity": 10,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 10,
    "inventory": ""
},
*/
export default interface Character{
    id?: string,
    name: string,
    ac: number,
    hp: number,
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
    inventory: string
}