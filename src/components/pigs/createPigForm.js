import { Button, Form, Table } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import { Modal } from "react-bootstrap";

function CreatePigForm() {
    const styleBorder = {'border': '1px solid'}
    const styleTopBot30 = {'padding-top': '30px', 'padding-bottom': '30px'}
    const styleBox1 = {'border': '1px solid', 'height':'500px', 
        'display':'-webkit-box',
        '-webkit-box-align':'center',
        '-webkit-box-pack':'center'
    }
    const styleBox2 = {'border': '1px solid', 'width': '450px' ,'height':'400px'}
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>
            </div>
            <div>
                <Modal show={show} onHide={handleClose} style={{width: '1000px', height: '500px'}}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <div>
                            <Container>
                                <Row>
                                    <Col md={{ span: 6, offset: 3 }} style={styleBorder}>
                                    <Row style={styleBorder}>
                                        <p>
                                            THÊM CÁ THỂ
                                        </p>
                                    </Row>
                                    <Row>
                                        <div style={styleBox1}>
                                            <div style={styleBox2}>
                                                <Form>
                                                    <div>

                                                    </div>
                                                    <div>
                                                        
                                                            <Row>
                                                                <Col  md={{ span: 3, offset: 3 }}>
                                                                    <Button>Thêm</Button>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <Button>Hủy bỏ</Button>
                                                                </Col>
                                                            </Row>
                                                        
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </div> */}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default CreatePigForm;