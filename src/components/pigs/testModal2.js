import './testModal.css';

function TestModal2() {
    console.log("hello modal")
    return (
        <>
            <div id="myModal" className="modal" >
                    {/* <!-- Nội dung form đăng nhập --> */}
                    <div className ="modal-content">
                        <form action="#">
                            <span className="close" >&times;</span>
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
                                <button type='button' >Hủy</button>
                            </div>
                        </form>
                    </div>
            </div>
        </>
    )
}

export default TestModal2;