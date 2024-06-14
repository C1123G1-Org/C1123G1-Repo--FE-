import axios from "axios";
import Cookies from "js-cookie";

export default class PigService {
  // static async getAllPig(){
  static async getAllPig(pageSize, page) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/${pageSize}?page=${page}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    return response.data;
  }


  //   static async getAllPigLitst(){
  //     const response = await axios.get(`http://localhost:8080/api/pigs`,
  //         {
  //             headers: {
  //               "Content-type": "application/json",
  //               Authorization: `Bearer ${Cookies.get("user")}`,
  //             },
  //           }
  //     )
  //     return response.data;
  // }
  // static async getAllDateInList(){
  //   const response = await axios.get(`http://localhost:8080/api/pigs/dateInList`,
  //       {
  //           headers: {
  //             "Content-type": "application/json",
  //             Authorization: `Bearer ${Cookies.get("user")}`,
  //           },
  //         }
  //   )
  //   return response.data;
  // }
  static async getAllDateInListByMonth( month, year){
    const response = await axios.get(`http://localhost:8080/api/pigs/dateInListByMonth?month=${month}&&year=${year}`,
        {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("user")}`,
            },
          }
    )
    return response.data;
}
  static async getAllDateInListByYear(year){
    const response = await axios.get(`http://localhost:8080/api/pigs/dateInListByYear?year=${year}`,
        {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("user")}`,
            },
          }
    )
    return response.data;
  }
    static async getAllCote(){
        const response = await axios.get(`http://localhost:8080/api/pigs/coteListAll`, 
            {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${Cookies.get("user")}`,
                },
              }
        )
        return response.data;
    }

    static async getAllCoteAvaiable(){
      const response = await axios.get(`http://localhost:8080/api/pigs/coteListAvaiable`, 
          {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("user")}`,
              },
            }
      )
      return response.data;
  }

    static async createPig(pig){
        return await axios.post("http://localhost:8080/api/pigs",pig
            ,
            {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${Cookies.get("user")}`,
                },
              }
        )
    }
    static async findByID(id){
        const response = await axios.get("http://localhost:8080/api/pigs/find/"+ id, 
            {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${Cookies.get("user")}`,
                },
              }
        )
        return response.data;
    }
    static async updatePig(pig,id){
        return await axios.put("http://localhost:8080/api/pigs/"+ id,pig
            , 
            {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${Cookies.get("user")}`,
                },
              }
        )
    }


  static async searchPigByStatus(status) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/statusSearch?status=${status}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    return response.data;
  }
  static async deletePig(id) {
    return await axios.delete("http://localhost:8080/api/pigs/" + id, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("user")}`,
      },
    });
  }

  static async searchCoteCode(code) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/search?code=${code}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    return response.data;
  }
  static async searchOpen(startDate, endDate) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/search/in?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    return response.data;
  }
  static async searchOpenCote(startDate, endDate, code) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/search/in/cote?startDate=${startDate}&endDate=${endDate}&code=${code}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    return response.data;
  }

  static async searchClose(startDate, endDate) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/search/out?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    return response.data;
  }
  static async searchCloseCote(startDate, endDate, code) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/search/out/cote?startDate=${startDate}&endDate=${endDate}&code=${code}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    return response.data;
  }

  static async getAllDateInListByWeek(){
    const response = await axios.get(`http://localhost:8080/api/pigs/dateInListByWeek`,
        {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("user")}`,
            },
          }
    )
    return response.data;
  }

}
