import * as React from "react";

function Footer() {
  return (
    <>
      <div className="footer-container d-flex justify-content-center align-items-center">
        <div className="footer-items-container container">
          <div className="row">
            <div className="logo-footer col">
              <img
                src={require("../../../assets/image/logo.jpg")}
                alt=""
              />
            </div>
            <div className="footer-items col-lg">
              <h4 className="footer-items-heading">Liên hệ</h4>
              <p className="footer-items-element">Giới thiệu</p>
              <p className="footer-items-element"> Điều khoản sử dụng</p>
              <p className="footer-items-element">Chính sách bảo mật</p>
              <p className="footer-items-element">Quảng cáo</p>
            </div>
            <div className="footer-items col-lg">
              <h4 className="footer-items-heading">Khác</h4>
              <p className="footer-items-element">Tổng hợp</p>
            </div>
            <div className="information-footer footer-items col-lg-6">
              <p>
                Giấy phép thiết lập trang thông tin điện tử tổng hợp số
                1818/GP-TTĐT do Sở Thông tin và Truyền thông Hà Nội cấp ngày
                05/05/2017
                <br />
                Đơn vị thiết lập: Công ty cổ phần công nghệ EPI * Chịu trách
                nhiệm: Vũ Trọng Cường
                <br />
                Địa chỉ: Tầng 16, Tòa nhà TNR Tower, số 54A Nguyễn Chí Thanh,
                phường Láng Thượng, quận Đống Đa, Hà Nội.
                <br />
                Điện thoại: (024) 3-542-3555 Email: contact.baomoi@epi.com.vn
              </p>
              <br />
              <p>
                Tổng hợp và sắp xếp các thông tin tự động
                <br />
                bởi chương trình máy tính
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
