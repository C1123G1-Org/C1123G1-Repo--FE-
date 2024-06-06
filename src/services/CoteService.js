import axios from "axios";

export default class CoteService{
    static async getAll(pageSize,page){
        const response = await axios.get(`http://localhost:8080/api/cotes/${pageSize}?page=${page}`)
        // console.log(response.data)
        return response.data;
    }
    static async createCote(cote){
        return await axios.post("http://localhost:8080/api/cotes",cote)
    }
    static async findByID(id){
        const response = await axios.get("http://localhost:8080/api/cotes/find/"+ id)
        return response.data;
    }
    static async updateCote(cote,id){
        return await axios.put("http://localhost:8080/api/cotes/"+ id,cote)
    }
    // static async deleteOrder(id){
    //     return await axios.delete("http://localhost:8080/orders/"+ id)
    // }

    static async searchAccountCode(code){
        const response = await axios.get(`http://localhost:8080/api/cotes/search?code=${code}`)
        return response.data;
    }
    static async searchOpen(startDate,endDate){
        const response = await axios.get(`http://localhost:8080/api/cotes/search/open?startDate=${startDate}&endDate=${endDate}`)
        return response.data;
    }
    static async searchOpenAccount(startDate,endDate,code){
        const response = await axios.get(`http://localhost:8080/api/cotes/search/open/account?startDate=${startDate}&endDate=${endDate}&code=${code}`)
        return response.data;
    }

    static async searchClose(startDate,endDate){
        const response = await axios.get(`http://localhost:8080/api/cotes/search/close?startDate=${startDate}&endDate=${endDate}`)
        return response.data;
    }
    static async searchCloseAccount(startDate,endDate,code){
        const response = await axios.get(`http://localhost:8080/api/cotes/search/close/account?startDate=${startDate}&endDate=${endDate}&code=${code}`)
        return response.data;
    }

    static async findPigsByCote(id){
        const response = await axios.get(`http://localhost:8080/api/cotes/pigs?id=${id}`)
        return response.data;
    }

    static async getCotes(){
        const response = await axios.get(`http://localhost:8080/api/cotes/getCodes`)
        return response.data;
    }

    static async changeCote(object){
        const response = await axios.put(`http://localhost:8080/api/cotes/changes`,object)
        return response.data;
    }

    static async exportCote(exportCote){
        const response = await axios.post(`http://localhost:8080/api/exportcotes`,exportCote)
        return response.data;
    }

    static async updatePigsAfterExportCote(Cote_code){
        const response = await axios.put(`http://localhost:8080/api/cotes/updatePigsAfterExportCote?code=`+ Cote_code)
        return response.data;
    }


}
