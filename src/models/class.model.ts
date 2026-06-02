/*
{
    "id":"1",
    "name": "Fighter",
    "hit_die": 10,
    "actions":"",
    "features":""
},
*/

export default interface Class{
    id?: string,
    name: string,
    hitDie: number,
    actions: string,
    features: string
}