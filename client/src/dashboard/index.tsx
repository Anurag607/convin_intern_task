import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import BucketList from "./main";
import History from "./history";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ProSidebarProvider>
      <ColorModeContext.Provider value={colorMode as any}>
        <ThemeProvider theme={theme as any}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/main" element={<BucketList />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ProSidebarProvider>
  );
}

export default App;
