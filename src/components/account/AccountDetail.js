import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "../../assets/css/AccountDetail.css";
import {
  editCurrentAccountInformation,
  editPassword,
  getCurrentAccountInfomation,
} from "../../services/AccountService";

const AccountDetail = () => {
  const REGEX = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    identityCode: /0[0-9]{11}/,
  };

  const ACCOUNT_ERROR = {
    email: "Vui lòng nhập email theo đúng định dạng **@gmail.com",
    identityCode: "Vui lòng nhập mã định danh theo định dạng 0***********",
    date_min: "Bạn chưa đủ tuổi lao động",
    date_max: "Bạn đã hết tuổi lao động",
  };

  const initialPasswordState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // State
  const [account, setAccount] = useState({});
  const [originInformation, setOriginInformation] = useState({});
  const [show, setShow] = useState(false);
  const [error, setError] = useState({});
  const [errorPassword, setErrorPassword] = useState({});
  const [password, setPassword] = useState(initialPasswordState);
  //---//

  // Handle modal
  const handleClose = () => {
    setPassword(initialPasswordState);
    setErrorPassword({});
    setShow(false);
  };

  const handleShow = () => setShow(true);
  //---//

  // userEffect to get the data at the componentWillMount
  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    const gottenAccount = await getCurrentAccountInfomation();
    setAccount(gottenAccount);
    setOriginInformation(gottenAccount);
  };
  //---//

  // Reset btn event
  const resetHandler = () => {
    getAccount();

    let resetedError = {};
    for (let e in error) {
      resetedError[e] = null;
    }

    setError(resetedError);
  };
  //---//

  // Prevent action in form
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const preventSubmitPasswordForm = (e) => {
    e.preventDefault();
  };
  //---//

  // Edit information
  const editHandler = () => {
    editAccount();
  };

  const editAccount = async () => {
    try {
      await editCurrentAccountInformation(account);
      toast.success("Sửa đổi thông tin tài khoản thành công.");
    } catch (e) {
      toast.error("Sửa đổi thông tin tài khoản không thành công.");
    }
  };

  const sendPassword = async () => {
    try {
      const passwordResponse = await editPassword(password);
      toast.success(passwordResponse.message);
      handleClose();
      setPassword({});
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  //---//

  // Onchange handlers
  const changeHandler = (e) => {
    setError({ ...error, [e.target.name]: null });

    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const changeDate = (date) => {
    date = new Date(date).toLocaleDateString();
    date = `${date.split("/")[2]}-${
      +date.split("/")[0] < 10 ? `0${+date.split("/")[0]}` : +date.split("/")[0]
    }-${
      +date.split("/")[1] < 10 ? `0${+date.split("/")[1]}` : +date.split("/")[1]
    }`;
    setAccount({ ...account, date: date });
  };

  const changeGender = () => {
    setAccount({ ...account, gender: !account.gender });
  };

  const changeInputPasswordHandler = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();
    sendPassword();
  };
  //---//

  // Catch errors
  const catchError = (e) => {
    if (e.target.name === "email" || e.target.name === "identityCode") {
      setError({
        ...error,
        [e.target.name]: REGEX[e.target.name].test(e.target.value)
          ? null
          : ACCOUNT_ERROR[e.target.name],
      });
    }
    if (e.target.value === "") {
      setError({
        ...error,
        [e.target.name]: "Vui lòng nhập thông tin trường này",
      });
    }
  };

  const catchErrorDate = (e) => {
    e = +e.target.value.split("/")[2];
    if (e > new Date().getFullYear() - 18) {
      setError({ ...error, date: ACCOUNT_ERROR.date_min });
    } else if (e < new Date().getFullYear() - 65) {
      setError({ ...error, date: ACCOUNT_ERROR.date_max });
    } else {
      setError({ ...error, date: null });
    }
  };

  const catchPasswordError = (e) => {
    if (e.target.value === "") {
      setErrorPassword({
        ...errorPassword,
        [e.target.name]: "Vui lòng nhập mật khẩu",
      });
    } else {
      if (
        e.target.name === "confirmPassword" ||
        e.target.name === "newPassword"
      ) {
        setErrorPassword({
          ...errorPassword,
          confirmPassword:
            password.confirmPassword !== password.newPassword
              ? "Mật khẩu xác nhận không khớp với mật khẩu mới"
              : null,
          newPassword: null,
        });
      } else {
        setErrorPassword({
          ...errorPassword,
          [e.target.name]: null,
        });
      }
    }
  };
  //---//

  return (
    <>
      <div className="account-information-container">
        <div className="account-main">
          <form
            className="account-form"
            onSubmit={submitHandler}
          >
            {/* <h1 className="account-form-title">Thông tin cá nhân của bạn</h1> */}

            <div className="information-container">
              <div className="information-left">
                <div className="account-items">
                  <label
                    htmlFor="username"
                    className="account-item-lable"
                  >
                    Tên tài khoản:
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="account-item-input readonly"
                    readOnly
                    value={account.username}
                  />
                </div>
                <div className="account-items">
                  <label
                    htmlFor="employee-code"
                    className="account-item-lable"
                  >
                    Mã nhân viên:
                  </label>
                  <input
                    id="employee-code"
                    type="text"
                    className="account-item-input readonly"
                    readOnly
                    value={account.code}
                  />
                </div>
                <div className="account-items">
                  <label
                    htmlFor="fullname"
                    className="account-item-lable"
                  >
                    Họ và tên:
                  </label>
                  <input
                    id="fullname"
                    name="fullName"
                    type="text"
                    className="account-item-input"
                    onBlur={catchError}
                    onChange={changeHandler}
                    value={account.fullName}
                  />
                  {error.fullName && (
                    <p className="account-error">{error.fullName}</p>
                  )}
                </div>
                <div className="account-items">
                  <label
                    htmlFor="email"
                    className="account-item-lable"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="account-item-input"
                    value={account.email}
                    onBlur={catchError}
                    onChange={changeHandler}
                  />
                  {error.email && (
                    <p className="account-error">{error.email}</p>
                  )}
                </div>
              </div>
              <div className="information-right">
                <div className="account-items">
                  <label
                    htmlFor="gender"
                    className="account-item-lable"
                  >
                    Giới tính:
                  </label>
                  <input
                    id="gender"
                    name="gender"
                    type="text"
                    className="account-item-input"
                    readOnly
                    value={account.gender ? "Nam" : "Nữ"}
                    onClick={changeGender}
                  />
                </div>
                <div className="account-items">
                  <label
                    htmlFor="birth"
                    className="account-item-lable"
                  >
                    Ngày sinh:
                  </label>
                  {/* <input
                id="birth"
                name="date"
                type="date"
                className="account-item-input"
                value={account.date}
                onChange={changeHandler}
              /> */}
                  <ReactDatePicker
                    id="birth"
                    name="date"
                    className="account-item-input"
                    selected={account.date}
                    onBlur={catchErrorDate}
                    onChange={changeDate}
                    dateFormat="dd/MM/yyyy"
                  />
                  {error.date && <p className="account-error">{error.date}</p>}
                </div>
                <div className="account-items">
                  <label
                    htmlFor="indentity-code"
                    className="account-item-lable"
                  >
                    Căn cước công dân:
                  </label>
                  <input
                    id="identity-code"
                    name="identityCode"
                    type="text"
                    className="account-item-input"
                    value={account.identityCode}
                    onBlur={catchError}
                    onChange={changeHandler}
                  />
                  {error.identityCode && (
                    <p className="account-error">{error.identityCode}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="btns-container">
              <button
                disabled={
                  (account.fullName === originInformation.fullName &&
                    account.email === originInformation.email &&
                    account.gender === originInformation.gender &&
                    account.date === originInformation.date &&
                    account.identityCode === originInformation.identityCode) ||
                  error.fullName ||
                  error.date ||
                  error.identityCode ||
                  error.email
                }
                className="account-form-btn btn btn-warning"
                onClick={editHandler}
              >
                Sửa thông tin
              </button>

              <button
                className="account-form-btn btn btn-info"
                onClick={handleShow}
              >
                Đổi mật khẩu
              </button>
              <button
                className="account-form-btn btn btn-success"
                onClick={resetHandler}
              >
                Hoàn tác
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        style={{ marginTop: "80px", marginLeft: "120px" }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#1976d2", color: "#fff" }}
        >
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body className="account-main">
          <form
            className="changePassword-form"
            onSubmit={preventSubmitPasswordForm}
          >
            <div className="password-items">
              <label
                htmlFor="old-password"
                className="password-item-lable"
              >
                Mật khẩu cũ:
              </label>
              <input
                id="old-password"
                name="oldPassword"
                type="password"
                className="password-item-input"
                value={password.oldPassword}
                onBlur={catchPasswordError}
                onChange={changeInputPasswordHandler}
              />
              {errorPassword.oldPassword && (
                <p className="account-error">{errorPassword.oldPassword}</p>
              )}
            </div>
            <div className="password-items">
              <label
                htmlFor="new-password"
                className="password-item-lable"
              >
                Mật khẩu mới:
              </label>
              <input
                id="new-password"
                name="newPassword"
                type="password"
                className="password-item-input"
                value={password.newPassword}
                onBlur={catchPasswordError}
                onChange={changeInputPasswordHandler}
              />
              {errorPassword.newPassword && (
                <p className="account-error">{errorPassword.newPassword}</p>
              )}
            </div>
            <div className="password-items">
              <label
                htmlFor="confirm-password"
                className="password-item-lable"
              >
                Nhập lại mật khẩu mới:
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                className="password-item-input"
                value={password.confirmPassword}
                onBlur={catchPasswordError}
                onChange={changeInputPasswordHandler}
              />
              {errorPassword.confirmPassword && (
                <p className="account-error">{errorPassword.confirmPassword}</p>
              )}
            </div>
            <div className="password-btns-container">
              <button
                className="account-form-btn btn btn-secondary"
                onClick={handleClose}
              >
                Hủy
              </button>
              <button
                disabled={
                  password.oldPassword === "" ||
                  password.newPassword === "" ||
                  password.confirmPassword === "" ||
                  password.newPassword !== password.confirmPassword
                }
                className="account-form-btn btn btn-info"
                onClick={changePasswordHandler}
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AccountDetail;
