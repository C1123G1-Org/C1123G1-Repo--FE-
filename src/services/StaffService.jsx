import axios from "axios";

export const getAllStaff = async () => {
  const res = await axios.get("http://localhost:8080/staff");
  return res.data;
};
export const getCreateStaff = async (staff) => {
  try {
    console.log(staff);
    const res = await axios.post("http://localhost:8080/staff/create", staff);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const findByID = async (id) => {
  const res = await axios.get(`http://localhost:8080/staff/${id}`);
  console.log(res.data);
  return res.data;
};

export const getUpdateStaff = async (staff) => {
  const res = await axios.put(
    `http://localhost:8080/staff/update/${staff.id}`,
    staff
  );
  return res.data;
};

export const removeStaff = async (id) => {
  const res = await axios.delete(`http://localhost:8080/staff/remove/${id}`);
  return res.data;
};
