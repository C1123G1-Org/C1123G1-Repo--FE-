import * as Yup from "yup";
class Validate{
    static validatePost(){
        return({
            title: Yup.string()
                .required("Vui lòng không để trống")
                .min(30, "Nhập ít nhất 30 ký tự"),
            content: Yup.string()
                .required("Vui lòng không để trống")
                .min(100, "Nhập ít nhất 100 ký tự"),
            image: Yup.string()
                .required("Vui lòng không để trống")
        })
    }
}
export default Validate;
