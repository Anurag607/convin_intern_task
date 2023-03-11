import { useState } from "react";

import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";

import {
  Box,
  IconButton,
  menuItemClasses,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { colorTokens } from "../theme";

import {
  HomeOutlined,
  HistoryOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

// Custom Item Component for rendering sidebar menu items...
const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  customFunction,
}: {
  title: string;
  to: string;
  icon: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  customFunction?: () => void;
}) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);

  return (
    <Link to={to}>
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
          backgroundColor: "transparent",
          padding: "10px 0px 10px 0px",
        }}
        onClick={() => {
          setSelected(title);
          typeof customFunction !== "undefined" ? customFunction() : "";
        }}
        icon={icon}
        component="div"
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

// Main Sidebar is rendered here...
const Sidebar = () => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);

  const { collapseSidebar, collapsed, toggleSidebar } = useProSidebar();

  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  // Function for logging out the user...
  const Logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <Box>
      <ProSidebar
        defaultCollapsed={false}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            background: `${colors.primary[400]} !important`,
            height: "100vh",
          },
          [`& .${menuClasses.root}`]: {
            padding: "5px 25px 5px 20px !important",
          },
          [`& .${menuClasses.active}`]: {
            color: "#6870fa !important",
          },
          [`.${menuItemClasses.root}:hover`]: {
            color: "#000000 !important",
          },
        }}
      >
        <Menu>
          {/* Sidebar header (title + collapse button) */}
          <MenuItem
            onClick={() => collapseSidebar()}
            icon={collapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              backgroundColor: "transparent",
              padding: "10px 0px 10px 0px",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" sx={{ color: colors.grey[100] }}>
                  iDash
                </Typography>
                <IconButton type="button" onClick={() => toggleSidebar()}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Sidebar body (dashboard menu items) */}
          <Box>
            <Item
              title="Dashboard"
              to="/home/main"
              icon={(<HomeOutlined />) as any}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />
            <Item
              title="History"
              to="/home/history"
              icon={(<HistoryOutlined />) as any}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />
            <Item
              title="Logout"
              to="/"
              customFunction={Logout}
              icon={(<LogoutOutlined />) as any}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
