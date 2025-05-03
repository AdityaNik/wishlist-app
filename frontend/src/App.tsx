import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import WishlistPage from "./components/WishlistPage";
import Login from "./components/Login";
import { Navbar } from "./components/Navbar";
import Register from "./components/Register";
import { useEffect } from "react";
import axios from "axios";
import { useAtomState } from "@zedux/react";
import { userState } from "./store/atoms/user";
import CreateWishList from "./components/CreateWishList";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <InitUser />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateWishList />} /> 
          <Route path="/wishlist/:id" element={<WishlistPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

function InitUser() {
  const [, setUser] = useAtomState(userState);

  const init = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/me`, {
        headers: {
          email: localStorage.getItem("user"), 
        },
      });
      if (response.data) {
        console.log("Inside Init: ", response.data);

        setUser({
          isLoading: true,
          username: response.data.username,
          email: response.data.email,
        });
      } else {
        setUser({
          isLoading: false,
          username: "",
          email: "",
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        username: "",
        email: "",
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <div></div>;
}

export default App;
