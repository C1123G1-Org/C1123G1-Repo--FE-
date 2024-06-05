
import axios from "axios";

export async function findAll(page){
    let res = await axios.get(`http://localhost:8080/api/exportcotes?page=${page}` , {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    return res;
}

export async function deleteList(id){
    let res = await axios.delete(`http://localhost:8080/api/exportcotes/${id}` , {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    return res;
}