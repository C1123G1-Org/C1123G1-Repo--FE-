import axios from "axios";

export default class CoteService{
    static async getAll(){
        const response = await axios.get("http://localhost:8080/api/cotes")
        return response.data;
    }
    static async createCote(cote){
        return await axios.post("http://localhost:8080/api/cotes",cote)
    }
    static async findByID(id){
        const response = await axios.get("http://localhost:8080/api/cotes/"+ id)
        return response.data;
    }
    static async updateCote(cote,id){
        return await axios.put("http://localhost:8080/api/cotes/"+ id,cote)
    }
    // static async deleteOrder(id){
    //     return await axios.delete("http://localhost:8080/orders/"+ id)
    // }
    // static async  searchContaining(keyWord) {
    //     const response = await axios.get("http://localhost:8080/orders?name_like="+keyWord);
    //     return response.data;
    // }
    // static async  searchContaining2(keyWord,page) {
    //     const response = await axios.get(`http://localhost:8080/orders?name_like=${keyWord}&_page=${page}&_limit=3`);
    //     return response.data;
    // }
    // static async  searchTop(page,limit) {
    //     const response = await axios.get(`http://localhost:8080/orders?_sort=money&_order=desc&_page=${page}&_limit=${limit}`);
    //     return response.data;
    // }
}
