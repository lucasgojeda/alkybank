/** Libraries */
import * as React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

/** Custom hooks */
import { useAuthStore } from "../../hooks";

export const NavbarMovil = () => {
  const { StartLogout } = useAuthStore();
  const [value, setValue] = React.useState(0);

  const routes = [
    {
      name: "Users",
      link: "/users",
      icon: <GroupIcon />,
    },
    {
      name: "Balance",
      link: "/balance",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      name: "Home",
      link: "/home",
      icon: <HomeIcon />,
    },
    {
      name: "Movements",
      link: "/movements",
      icon: <SwapVertIcon />,
    },
  ];

  return (
    <Box
      data-testid="navbar"
      sx={{
        width: "100%",
        position: "fixed",
        bottom: "-1px",
        left: 0,
      }}
    >
      <BottomNavigation
        sx={{
          height: "7.5vh",
          backgroundColor: "#1976D2",
          display: 'flex',
          alignItems: 'center'
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {routes.map((r, i) => {
          return (
            <Link key={i} to={r.link}>
              <BottomNavigationAction
                sx={{ color: "#fff" }}
                label={r.name}
                icon={r.icon}
              />
            </Link>
          );
        })}
        <BottomNavigationAction
          sx={{ color: "#fff" }}
          icon={<LogoutIcon />}
          onClick={StartLogout}
        />
      </BottomNavigation>
    </Box>
  );
};
