import { Box, IconButton, useTheme, InputBase } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, colorTokens } from "../theme";

import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  PersonOutlined,
} from "@mui/icons-material";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* Icons  */}
      <Box display="flex">
        <IconButton
          type="button"
          sx={{ p: 1 }}
          onClick={(colorMode as any).toggleColorMode}
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
