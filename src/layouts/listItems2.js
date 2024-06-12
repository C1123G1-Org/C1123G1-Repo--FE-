import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PeopleIcon from "@mui/icons-material/People";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SavingsIcon from "@mui/icons-material/Savings";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import ScaleIcon from "@mui/icons-material/Scale";
import StoreIcon from "@mui/icons-material/Store";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import EventNoteIcon from "@mui/icons-material/EventNote";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "./AppContext";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
// import Cookies from "js-cookie";

export default function ListItems2() {
    const { nut1, nut2, nut3, nut4, nut5, nut6} = useContext(AppContext);
    return (
        <>
            <React.Fragment>
                <ListSubheader component="div" inset>
                    Quản lý hệ thống
                </ListSubheader>
                <Link to={"/admin/posts-mgt"} style={{textDecoration: "none", color: "black"}}>
                    <ListItemButton selected = {nut1}>
                        <ListItemIcon>
                            <NewspaperIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Quản lý tin tức"/>
                    </ListItemButton>
                </Link>
                <Link to={"/admin/staff"} style={{textDecoration: "none", color: "black"}}>
                    <ListItemButton selected = {nut2}>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Quản lý nhân viên"/>
                    </ListItemButton>
                </Link>
                <Link to={"/admin/pig-stat"} style={{textDecoration: "none", color: "black"}}>
                    <ListItemButton selected = {nut3}>
                        <ListItemIcon>
                            <LeaderboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Thống kê"/>
                    </ListItemButton>
                </Link>
                <Link to={"/admin/contact-info"} style={{textDecoration: "none", color: "black"}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Danh sách liên hệ"/>
                    </ListItemButton>
                </Link>
            </React.Fragment>

            <React.Fragment>
                <ListSubheader component="div" inset>
                    Quản lý thông tin đàn
                </ListSubheader>
                <Link to={"/admin/pigs"} style={{textDecoration: "none", color: "black"}}>
                    <ListItemButton selected = {nut4} >
                        <ListItemIcon>
                            <SavingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Quản lý cá thể"/>
                    </ListItemButton>
                </Link>
                <Link to={"/admin/cotes"} style={{textDecoration: "none", color: "black"}}>
                    <ListItemButton selected = {nut5}>
                        <ListItemIcon>
                            <HouseSidingIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Quản lý chuồng nuôi"/>
                    </ListItemButton>
                </Link>
                <Link to={"/admin/export-cote"} style={{textDecoration: "none", color: "black"}}>
                    <ListItemButton selected = {nut6}>
                        <ListItemIcon>
                            <LocalShippingIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Quản lý xuất chuồng"/>
                    </ListItemButton>
                </Link>
            </React.Fragment>

            <React.Fragment>
                <ListSubheader component="div" inset>
                    Quản lý thức ăn
                </ListSubheader>
                <ListItemButton>
                    <ListItemIcon>
                        <BreakfastDiningIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Xem khối lượng"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <ScaleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Điều chỉnh khối lượng"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <StoreIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Quản lý kho"/>
                </ListItemButton>
            </React.Fragment>

            <React.Fragment>
                <ListSubheader component="div" inset>
                    Quản lý bệnh lý
                </ListSubheader>
                <ListItemButton>
                    <ListItemIcon>
                        <VaccinesIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Thông tin tiêm phòng"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <EventNoteIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Thông tin khám, chữa"/>
                </ListItemButton>
            </React.Fragment>
        </>
    );
}
