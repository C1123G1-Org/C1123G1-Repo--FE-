import axios from "axios";
export const getAllPig = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/pigs")
        return response.data
    }catch (e) {
        console.log(e)
        return [];
    }

}

export const addPig = async (pigAdd) => {
    try {
        await axios.post("http://localhost:8080/api/pigs", pigAdd);
    }catch (e) {
        console.log(e)
        throw e;
    }
}

export const deletePig = async (id) => {
    try {
        await axios.delete("http://localhost:8080/api/pigs/"+ id);
    }catch (e) {
        console.log(e)
        throw e;
    }
}

export const updatePig = async (id, pigUpdated) => {
    try {
        await axios.put("http://localhost:8080/api/pigs"+ id, pigUpdated);
    }catch (e) {
        console.log(e)
        throw e;
    }
}

// export const getPigByID = async (id) => {
//     try {
//         const response = await axios.get("http://localhost:8080/api/pigs", id);
//         return response.data
//     }catch (e) {
//         console.log(e)
//         return [];
//     }

// }