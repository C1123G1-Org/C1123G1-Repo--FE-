import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../assets/css/Main.css"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SavingsIcon from '@mui/icons-material/Savings';
// import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LogoutIcon from '@mui/icons-material/Logout';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

function Main() {
    const sigout = ()=>{
        localStorage.removeItem("username")
        Cookies.remove("user")
        Cookies.remove("role")
    }
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <>
                            <Row className={"picture"} >
                                <Col className={"picture-col"}>
                                    <div className={"picture-div"}>
                                        <Link to={"/admin/posts-mgt"} className={"link"}>
                                        <SettingsIcon className={"p1"} style={{fontSize: "180px"}}/>
                                        </Link>
                                    </div>
                                </Col>
                                <Col className={"picture-col"}>
                                    <div className={"picture-div"}>
                                        <Link to={"/admin/pigs"} className={"link"}>
                                        <SavingsIcon className={"p2"} style={{fontSize: "180px"}}/>
                                        </Link>
                                    </div>
                                </Col>
                                <Col className={"picture-col"}>
                                    <div className={"picture-div"}>
                                        <RestaurantIcon className={"p3"} style={{fontSize: "180px"}}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className={"text"}>
                                <Col className={"text-col"}>
                                    <div className={"text-div"}>
                                        <Link to={"/admin/posts-mgt"} className={"link"}>
                                        <h4>QUẢN LÝ HỆ THỐNG</h4>
                                        </Link>
                                    </div>
                                </Col>
                                <Col className={"text-col"}>
                                    <div className={"text-div"}>
                                        <Link to={"/admin/pigs"} className={"link"}>
                                        <h4>QUẢN LÝ THÔNG TIN ĐÀN</h4>
                                        </Link>
                                    </div>
                                </Col>
                                <Col className={"text-col"}>
                                    <div className={"text-div"}>
                                        <h4>QUẢN LÝ THỨC ĂN</h4>
                                    </div>
                                </Col>
                            </Row>
                            <Row className={"picture"} >
                                <Col className={"picture-col"}>
                                    <div className={"picture-div"}>
                                        <HealthAndSafetyIcon className={"p4"} style={{fontSize: "180px"}}/>
                                    </div>
                                </Col>
                                <Col className={"picture-col"}>
                                    <div className={"picture-div"}>
                                        <Link to={"/admin/export-cote"} className={"link"}>
                                        <LocalShippingIcon className={"p5"} style={{fontSize: "200px"}}/>
                                        </Link>
                                    </div>
                                </Col>
                                <Col className={"picture-col"}>
                                    <div className={"picture-div"}>
                                        <Link to={"/auth"} className={"link"} onClick={sigout}>
                                        <LogoutIcon className={"p6"} style={{fontSize: "180px"}}/>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                            <Row className={"text"}>
                                <Col className={"text-col"}>
                                    <div className={"text-div"}>
                                        <h4>QUẢN LÝ BỆNH LÝ</h4>
                                    </div>
                                </Col>
                                <Col className={"text-col"}>
                                    <div className={"text-div"}>
                                        <Link to={"/admin/export-cote"} className={"link"}>
                                        <h4>QUẢN LÝ XUẤT CHUỒNG </h4>
                                        </Link>
                                    </div>
                                </Col>
                                <Col className={"text-col"}>
                                    <div className={"text-div"}>
                                        <Link to={"/auth"} className={"link"} onClick={sigout}>
                                        <h4>ĐĂNG XUẤT</h4>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Main;