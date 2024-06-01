import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Table } from 'react-bootstrap';

function TestGrid() {
    const styleTextCenter = {'text-align': 'center'}
    const styleLeft50 = {'padding-left': '50px'}
    const styleBorder = {'border': '1px solid'}
    const styleTopBot30 = {'padding-top': '30px', 'padding-bottom': '30px'}
    const styleTopBot5 = {'padding-top': '5px', 'padding-bottom': '5px'}
  return (
    <Container >
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row style={{border: '1px solid', height: '40px'}}>
        <Col>
            <div>
                <p>
                    
                </p>
            </div>
        </Col>
      </Row>
      <Row >
        <Col sm={3} style={styleBorder}>
          <div style={styleLeft50}>
            <p>
                QUẢN LÝ THÔNG TIN ĐÀN
            </p>
          </div>
        </Col>
        <Col sm={9} style={styleBorder}>
            <div style={styleLeft50}>
                <p>
                    QUẢN LÝ CÁ THỂ
                </p>
            </div>
        </Col>
      </Row>

      {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
      <Row style={{height: '550px'}}>
        <Col sm={3} style={styleBorder}>
          <div>
            Quản lý cá thể
          </div>
          <div>
            Quản lý chuồng nuôi
          </div>
        </Col>
        <Col sm={9} style={styleBorder}>
          <Row>
            <Col sm={2}>
            
            </Col>
            <Col sm = {8}>
                <Row style={styleTopBot30}>
                    <Col>
                        <input size={50}></input>
                    </Col>
                    <Col>
                        <Button variant="secondary">Search</Button>
                    </Col>
                </Row>
            </Col>
            <Col sm={2}>
            
            </Col>
          </Row>
          <Row>
            <Col>
                <Table striped bordered hover size="sm" style={styleTextCenter}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>Thornton</td>
                        <td>@twitter</td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                    </Table>
            </Col>
          </Row>
          <Row style={styleTopBot30} >
            <Col sm={3}>
            
            </Col>
            <Col sm={2}>
                <div>
                    <Button>
                        Thêm
                    </Button>
                </div>
            </Col>
            <Col sm={2}>
                <div>
                    <Button>
                        Chỉnh sửa
                    </Button>
                </div>
            </Col>
            <Col sm={2}>
                <div>
                    <Button>
                        Xóa
                    </Button>
                </div>
            </Col>
            <Col sm={3}>
            
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{border: '1px solid', height: '40px'}}>
        <Col>
            <div>
                <p>
                    Người đăng nhập: admin, Thứ hai, 22/12/2022 9:12:30 AM
                </p>
            </div>
        </Col>
      </Row>

      {/* Columns are always 50% wide, on mobile and desktop */}
    </Container>
  );
}

export default TestGrid;