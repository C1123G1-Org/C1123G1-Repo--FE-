import { useEffect, useState } from 'react';
import './testModal.css';
import TestModal2 from './testModal2';

function TestModal() {
    const modal = document.getElementById('myModal');
  
    // Lấy phần button mở Modal
    const btn = document.getElementById("myBtn");
    let [modalHidden, setModalHidden] = useState({'display': 'none'});
    useEffect(() => {

    }, [modalHidden])

    // Lấy phần span đóng Modal
    // const span = document.getElementsByClassName("close")[0];
  
    // Khi button được click thi mở Modal
    const handleModalBlock = () => {
        console.log("block");
        setModalHidden({'display': 'block'});
    }
    const handleModalHidden = () => {
        console.log("None");
        setModalHidden({'display': 'none'});
    }
  
    // Khi span được click thì đóng Modal
    // span.onclick = function() {
    //     modal.style.display = "none";
    // }
  
    // Khi click ngoài Modal thì đóng Modal
    window.onclick = function(event) {
        if (event.target == modal) {
            setModalHidden({'display': 'none'});
        }
    }
    return (
        <>
            <div className="container">
                
                <h2>Freetuts.net hướng dẫn tạo Modal Box</h2>

                {/* <!-- Button đăng nhập để mở form đăng nhập --> */}
                <button onClick={handleModalBlock}>Đăng Nhập</button>

                {/* <!-- The Modal --> */}
                <div id="myModal" className="modal" style={modalHidden}>
                    {/* <!-- Nội dung form đăng nhập --> */}
                    <div className ="modal-content">
                        <form action="#">
                            <span className="close" onClick={handleModalHidden}>&times;</span>
                            <h2>Form đăng nhập</h2>
                            <div className="fomrgroup">
                                <b>Mã chuồng nuôi:</b>
                                <input type="text" name="username"></input>
                            </div>
                            <div className="fomrgroup">
                                <b>Ngày nhập chuồng:</b>
                                <input type="text" name="dateIn"></input>
                            </div>
                            <div className="fomrgroup">
                                <b>Ngày xuất chuồng:</b>
                                <input type="text" name="dateOut"></input>
                            </div>
                            <div className="fomrgroup">
                                <b>Tình trạng:</b>
                                <input type="text" name="status"></input>
                            </div>
                            <div className="fomrgroup">
                                <b>Cân nặng:</b>
                                <input type="text" name="weight"></input>
                            </div>
                            <div className="fomrgroup">
                                <button>Đăng nhập</button>
                            </div>
                            <div className="fomrgroup">
                                <button type='button' onClick={handleModalHidden}>Hủy</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestModal;