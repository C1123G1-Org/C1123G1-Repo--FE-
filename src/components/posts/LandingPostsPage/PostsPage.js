import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/PostPage.css';
import Footer from '../CommonPostPage/Footer';
import Header from '../CommonPostPage/Header';
import LeftSideBar from './LeftSidebar';
import MidContent from './MidContent';
import RightSideBar from './RightSideBar';
import './PostsPage.css'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { addContactInfo } from '../../../services/ContactInfoService';
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
function PostsPage() {
    const [isShowContactInfo, setIsShowContactInfo] = useState(false)
    const validationSchema = {
        fullName: Yup.string().required("Không đươc bỏ trống"),
        email: Yup.string().required("Không được bỏ trống"),
        address: Yup.string().required("Không được bỏ trống"),
        phone: Yup.string().matches(/^0\d{9,10}$/," Phải có 10 hoặc 11 số").required("Không được bỏ trống"),
        
    }
    const handleSubmit = (value) => {
        addContactInfo(value)
        .then((res) => {
            toast.success("Đã ghi nhận thông tin của bạn")
            setIsShowContactInfo(false)
        })
        .catch(e => {
            toast.error("Xảy ra lỗi")
        })
    }
    return (
        <>
            <header>
                <Header />
            </header>
            <main className='container mb-5'>
                <div className='row'>
                    <div className='left-sidebar-container col-3'>
                        <LeftSideBar></LeftSideBar>
                    </div>
                    <div className='content-container col-6'>
                        <MidContent></MidContent>
                    </div>
                    <div className='right-sidebar-container col-3'>
                        <RightSideBar></RightSideBar>
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
            <button class="btn btn-success contact-button" onClick={() => {setIsShowContactInfo(true)}} style={{padding: "3px", marginLeft: "20px", backgroundColor: "orange", border: "none"}}><ContactMailIcon style={{width: "40px", height:"30px", padding: "0px"}}/></button>
            <Modal show={isShowContactInfo} centered onHide={() => {setIsShowContactInfo(false)}}>
               
                <Modal.Body style={{backgroundColor:'green'}}>
                <Modal.Title style={{color: "white"}}>Liên hệ</Modal.Title><br/>
                <p style={{color:'white'}}>Người chăn nuôi có thẻ giúp gì cho bạn.?</p>
                
                    <Formik
                        initialValues={
                            {
                                fullName: '',
                                email:'',
                                phone:'',
                                address: '',
                                message:''
                            }
                        }
                        validationSchema={Yup.object(validationSchema)}
                        onSubmit={handleSubmit}
                    >
                        <Form className={"fff"}>
                            <Field name="fullName" placeholder="Tên bạn"
                                style={{ width: "46%", marginLeft: "8px", borderRadius:'5px' }}
                            /> 
                            <Field name="email" placeholder="Email" type="email"
                                style={{ width: "46%", marginLeft: "18px",borderRadius:'5px' }}
                            /> 
                            <ErrorMessage name='fullName' className='err--fullName' component={'span'}/>
                            <ErrorMessage name='email' className='err--email' component={'span'}/><br/><br/>
                            <Field  name="phone" placeholder="Số điện thoại"
                                style={{ width: "46%", marginLeft: "8px",borderRadius:'5px', marginTop:'5px' }}
                            /> 
                            
                            <Field name="address" placeholder="Địa chỉ"
                                style={{ width: "46%", marginLeft: "18px",borderRadius:'5px',marginTop:'5px' }}
                            /> 
                            <ErrorMessage name='phone' className='err--phone' component={'span'}/>
                            <ErrorMessage name='address' className='err--address' component={'span'}/><br/><br/>
                            <Field name="message" as="textarea" placeholder="Nội dung tin nhắn"
                                style={{width: '96%', marginTop:'10px', marginLeft:'7px', borderRadius:'5px', resize:'none', height:'150px', paddingLeft: "15px"}}
                            />
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ marginLeft: "5px" }}
                            >
                                Gửi
                            </Button>
                            
                            <Button style={{marginLeft:'5px'}} variant="secondary" onClick={() => {setIsShowContactInfo(false)}}>
                                Huỷ
                            </Button>
                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PostsPage;