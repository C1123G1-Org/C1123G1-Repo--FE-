import axios from "axios";
import Cookies from "js-cookie";

export default class CoteService {
  static async getAll(pageSize, page) {
    const response = await axios.get(
      `http://localhost:8080/api/cotes/${pageSize}?page=${page}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    // console.log(response.data)
    return response.data;
  }
  static async createCote(cote) {
    return await axios.post("http://localhost:8080/api/cotes", cote,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
        );
  }
  static async findByID(id) {
    const response = await axios.get(
      "http://localhost:8080/api/cotes/find/" + id,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
    );
    return response.data;
  }
  static async updateCote(cote, id) {
    return await axios.put("http://localhost:8080/api/cotes/" + id, cote,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
        );
  }
  // static async deleteOrder(id){
  //     return await axios.delete("http://localhost:8080/orders/"+ id)
  // }

  static async searchAccountCode(code) {
    const response = await axios.get(
      `http://localhost:8080/api/cotes/search?code=${code}`,
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
      `http://localhost:8080/api/cotes/search/open?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
    );
    return response.data;
  }
  static async searchOpenAccount(startDate, endDate, code) {
    const response = await axios.get(
      `http://localhost:8080/api/cotes/search/open/account?startDate=${startDate}&endDate=${endDate}&code=${code}`,
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
      `http://localhost:8080/api/cotes/search/close?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
    );
    return response.data;
  }
  static async searchCloseAccount(startDate, endDate, code) {
    const response = await axios.get(
      `http://localhost:8080/api/cotes/search/close/account?startDate=${startDate}&endDate=${endDate}&code=${code}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
    );
    return response.data;
  }

  static async findPigsByCote(id) {
    const response = await axios.get(
      `http://localhost:8080/api/cotes/pigs?id=${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
    );
    return response.data;
  }

  static async getCotes() {
    console.log(Cookies.get("user"));
    const response = await axios.get(
      `http://localhost:8080/api/cotes/getCodes`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    return response.data;
  }

  static async changeCote(object) {
    const response = await axios.put(
      `http://localhost:8080/api/cotes/changes`, object,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
    );
    return response.data;
  }

  static async exportCote(exportCote) {
    const response = await axios.post(
      `http://localhost:8080/api/exportcotes`, exportCote,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
    );
    return response.data;
  }

  static async updatePigsAfterExportCote(Cote_code) {
    const response = await axios.put(
      `http://localhost:8080/api/cotes/updatePigsAfterExportCote?code=${Cote_code}`,"",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
    );
    return response.data;
  }

    static async getUser(username) {
        const response = await axios.get(
            `http://localhost:8080/api/cotes/findUser/`+username,
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${Cookies.get("user")}`,
                },
            }
        );
        return response.data;
    }
}
