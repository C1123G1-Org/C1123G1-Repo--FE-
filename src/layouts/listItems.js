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
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export const mainListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Quản lý hệ thống
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý tin tức" />
        </ListItemButton>
        <Link to={"/admin/staff"} style={{textDecoration: "none", color: "black"}}>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý nhân viên" />
        </ListItemButton>
        </Link>

    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Quản lý thông tin đàn
        </ListSubheader>
        <Link to={"/admin/pigs"} style={{textDecoration: "none", color: "black"}}>
        <ListItemButton>
            <ListItemIcon>
                <SavingsIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý cá thể" />
        </ListItemButton>
        </Link>
        <Link to={"/admin/cotes"} style={{textDecoration: "none", color: "black"}}>
        <ListItemButton >
            <ListItemIcon>
                <HouseSidingIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý chuồng nuôi"/>
        </ListItemButton>
        </Link>
        <Link to={"/admin/export-cote"} style={{textDecoration: "none", color: "black"}}>
        <ListItemButton>
            <ListItemIcon>
                <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý xuất chuồng" />
        </ListItemButton>
        </Link>
    </React.Fragment>
);
export const thirdListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Quản lý thức ăn
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <BreakfastDiningIcon />
      </ListItemIcon>
      <ListItemText primary="Xem khối lượng" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ScaleIcon />
      </ListItemIcon>
      <ListItemText primary="Điều chỉnh khối lượng" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <StoreIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý kho" />
    </ListItemButton>
  </React.Fragment>
);

export const fourthListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Quản lý bệnh lý
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <VaccinesIcon />
      </ListItemIcon>
      <ListItemText primary="Thông tin tiêm phòng" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EventNoteIcon />
      </ListItemIcon>
      <ListItemText primary="Thông tin khám, chữa" />
    </ListItemButton>
  </React.Fragment>
);
