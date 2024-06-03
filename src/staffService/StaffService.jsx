import axios from "axios";

export const getAllStaff = async () => {
  const res = await axios.get("http://localhost:8080/staffs");
  return res.data;
};
// export const getCreateStaff = async (st) => {
//   const res = await axios.post("http://localhost:8080/staffs", st);
//   return res.data;
// };
