import * as Yup from "yup";
class Validate{
    static validatePost(){
        return({
            title: Yup.string()
                .required("Vui lòng không để trống")
                .min(20, "Nhập ít nhất 20 ký tự")
                .max(200, "Bạn nhập quá 200 kí tự"),
            // content: Yup.string()
            //     .required("Vui lòng không để trống")
            //     .min(1, "Nhập ít nhất 100 ký tự"),
            // image: Yup.string()
            //     .required("Vui lòng không để trống")
        })
    }
}
export default Validate;
