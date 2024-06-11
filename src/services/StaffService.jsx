import axios from "axios";
import Cookies from "js-cookie";

export const getAllStaff = async (page, username) => {
  const res = await axios.get(
    `http://localhost:8080/staff?page=${page}&name=${username}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("user")}`,
      },
    }
  );
  return res.data;
};
export const getCreateStaff = async (staff) => {
  try {
    console.log(staff);
    const res = await axios.post("http://localhost:8080/staff/create", staff, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("user")}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const findByID = async (id) => {
  const res = await axios.get(`http://localhost:8080/staff/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${Cookies.get("user")}`,
    },
  });
  console.log(res.data);
  return res.data;
};

export const getUpdateStaff = async (staff) => {
  const res = await axios.put(
    `http://localhost:8080/staff/update/${staff.id}`,
    staff,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("user")}`,
      },
    }
  );
  return res.data;
};

export const removeStaff = async (id) => {
  const res = await axios.delete(`http://localhost:8080/staff/remove/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${Cookies.get("user")}`,
    },
  });
  return res.data;
};

export const detailstaff = async (staff) => {
  const res = await axios.get(
    `http://localhost:8080/staff/detail/${staff.id}`,
    staff,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("user")}`,
      },
    }
  );
  return res.data;
};
