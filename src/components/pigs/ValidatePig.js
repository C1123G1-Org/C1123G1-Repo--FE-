import * as Yup from "yup";
class ValidatePig{
    static validatePig(){
        return({
            // code: Yup.string()
            // .matches(/^C[0-9]*$/,"Nhập theo định dạng: C**"),
            // dateOpen: Yup.string()
            //     .required("Ngày đặt không để trống"),
            // money: Yup.number().typeError('Bạn phải nhập số')
            //   .required("Tổng tiền không được để trống")
            //   .min(0, "Tổng tiền không được nhỏ hơn 0")
            //   .max(10000000000),
            // quantity: Yup.number().typeError('Vui lòng nhập số')
            //     .required("Vui lòng không để trống")
            //     .min(0, "Số lượng không nhỏ hơn 0")
            //     .max(10000000000),

        })
    }
}
export default ValidatePig;
