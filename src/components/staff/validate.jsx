import * as Yup from "yup";
class validate {
  static valiStaff() {
    return {
      // code: Yup.string()
      //     .required("Vui lòng không để trống")
      //     .min(3, "Nhập ít nhất 3 ký tự")
      // .matches(/^C[0-9]*$/,"Nhập theo định dạng: C**"),
      // dateOpen: Yup.string()
      //     .required("Ngày đặt không để trống"),
      // quantity: Yup.number().typeError('Vui lòng nhập số')
      //     .required("Vui lòng không để trống")    `   `
      //     .min(0, "Số lượng không nhỏ hơn 0")
      //     .max(30,"Số lượng nhỏ hơn 100"),

      code: Yup.string()
        .required("vui lòng không để trống")
        .min(3, "Nhập ít nhất 3 kí tự"),
      identityCode: Yup.number()
        .typeError("vui lòng nhập số")
        .required("vui lòng không để trống"),
    };
  }
}
