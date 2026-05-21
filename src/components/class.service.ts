import type Class from "../types/class.type";

const url = "http://localhost:3000/classes";

export async function getClasses(): Promise<Class[]> {
    const response = await fetch(url);
    if(!response.ok){
        //Sikertelen lekérés -> TODO: később csinálni vele valami többet?
        console.error("HTTP error:", response.status);
        return []
    }
    return await response.json();
}

export async function getClass(id: string): Promise<Class> {
    const response = await fetch(`${url}/${id}`, {method: "GET"});
    return await response.json();
}

export async function createClass(newClass: Class): Promise<Class> {
    const response = await fetch(`${url}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newClass)
    });
    return await response.json();
}

export async function deleteClass(id: string): Promise<void> {
    const response = await fetch(`${url}/${id}`, {method: "DELETE"});
    if(!response.ok){
        //Hiba a törlésben -> TODO: csinálni valamit?
    }
}

export async function updateClass(id: string, updatedClass: Class): Promise<Class> {
    const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updateClass)
    });
    return await response.json();
}