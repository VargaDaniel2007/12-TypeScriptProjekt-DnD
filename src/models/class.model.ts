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
    desc: string,
    hit_die: number,
    actions: string,
    features: string
}