import axios from "axios";
import Cookies from "js-cookie";
import { ACCOUNT_API } from "../constants/AppConstant";

export const getCurrentAccountInfomation = async () => {
  try {
    return (
      await axios.get(`${ACCOUNT_API}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      })
    ).data;
  } catch (e) {
    return {};
  }
};

export const editCurrentAccountInformation = async (newAccount) => {
  try {
    return (
      await axios.put(`${ACCOUNT_API}`, newAccount, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      })
    ).data;
  } catch (e) {
    throw e;
  }
};

export const editPassword = async (passwords) => {
  try {
    return (
      await axios.put(`${ACCOUNT_API}/password`, passwords, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      })
    ).data;
  } catch (e) {
    throw e;
  }
};
