import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/theme";
import { CssBaseline } from "@mui/material";
import PostsProvider from "./context/PostsContext";
import UserProvider from "./context/UserContext";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <UserProvider>
        <PostsProvider>
          <Navbar search={search} setSearch={setSearch} />
          <Routes>
            <Route
              path="/"
              element={<Home search={search} setSearch={setSearch} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </PostsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
