import axios from "axios";
import Cookies from "js-cookie";

export async function addContactInfo(contactInfo){
    const res = await axios.post(`http://localhost:8080/api/contact-info`, JSON.stringify(contactInfo), {
        headers: {
             "Content-Type": "application/json",
            'Authorization': 'Bearer ' + Cookies.get('user')
        }
    })
    return res;
}

export async function getAllContactInfo(page){
    const res = await axios.get(`http://localhost:8080/api/contact-info?page=${page}`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + Cookies.get('user')
        }
    })
    return res;
}

export async function deleteListContactInfo(listId){
    const res = await axios.delete(`http://localhost:8080/api/contact-info`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + Cookies.get('user')
        },
        data: JSON.stringify(listId)
    })
}