import React, { Fragment, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logoutUser } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

interface UserOptionsProps {
  user: any;
  history: any;
}

export const UserOptions: React.FC<UserOptionsProps> = ({ user }) => {
  const history = useHistory();
  const { cartItems } = useSelector((state: any) => state.cart);
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();

  const dashboard = () => {
    history.push("/admin/dashboard");
  };
  const orders = () => {
    history.push("/orders");
  };
  const account = () => {
    history.push("/account");
  };
  const cart = () => {
    history.push("/cart");
  };

  const logout = () => {
    dispatch(logoutUser());
    alert.success("Logout Successfully");
  };
  const actions = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logout },
  ];
  if (user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      {/* <Backdrop open={open} /> */}
      <SpeedDial
        ariaLabel="SpeedDial"
        className="fixed right-[3vmax] top-[3vmax]"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="rounded-full w-[56px] h-[56px]"
            src={
              user.avatar.url
                ? user.avatar.url
                : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            }
          />
        }
      >
        {actions.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};
