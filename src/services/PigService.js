import axios from "axios";
import Cookies from "js-cookie";

export default class PigService {
  // static async getAllPig(){
  static async getAllPig(pageSize, page) {
    // const response = await axios.get(`http://localhost:8080/api/pigs`)
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
  static async getAllCote() {
    // const response = await axios.get(`http://localhost:8080/api/pigs`)
    const response = await axios.get(
      `http://localhost:8080/api/pigs/coteList`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    return response.data;
  }
  static async createPig(pig) {
    return await axios.post("http://localhost:8080/api/pigs", pig, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("user")}`,
      },
    });
  }
  static async findByID(id) {
    const response = await axios.get(
      "http://localhost:8080/api/pigs/find/" + id,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      }
    );
    return response.data;
  }
  static async updatePig(pig, id) {
    return await axios.put("http://localhost:8080/api/pigs/" + id, pig, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("user")}`,
      },
    });
  }

  static async searchPigByStatus(status) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/statusSearch?status=${status}`
    );
    return response.data;
  }
  static async deletePig(id) {
    return await axios.delete("http://localhost:8080/api/pigs/" + id);
  }
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

  static async searchCoteCode(code) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/search?code=${code}`
    );
    return response.data;
  }
  static async searchOpen(startDate, endDate) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/search/in?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  }
  static async searchOpenCote(startDate, endDate, code) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/search/in/cote?startDate=${startDate}&endDate=${endDate}&code=${code}`
    );
    return response.data;
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
      `http://localhost:8080/api/pigs/search/out?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  }
  static async searchCloseCote(startDate, endDate, code) {
    const response = await axios.get(
      `http://localhost:8080/api/pigs/search/out/account?startDate=${startDate}&endDate=${endDate}&code=${code}`
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
      `http://localhost:8080/api/pigs/search/out/account?startDate=${startDate}&endDate=${endDate}&code=${code}`,
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
