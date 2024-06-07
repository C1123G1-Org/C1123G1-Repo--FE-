
import axios from "axios";
import Cookies from "js-cookie";
export async function findAll(page){
    let res = await axios.get(`http://localhost:8080/api/exportcotes?page=${page}` , {
        headers: {
            'Authorization': 'Bearer ' + Cookies.get('user')
        }
    })
    return res;
}

export async function deleteList(id){
    let res = await axios.delete(`http://localhost:8080/api/exportcotes/${id}` , {
        headers: {
            'Authorization': 'Bearer ' + Cookies.get('user')
        }
    })
    return res;
}