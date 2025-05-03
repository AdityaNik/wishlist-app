import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from 'axios';
import { useAtomState } from "@zedux/react";
import { userState } from "@/store/atoms/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [, setUser] = useAtomState(userState)

  const handleLogin = async() => {

    try {
      const res = await axios.post('https://wishlist-app-aoix.onrender.com/auth/login', {
        email,
        password,
      });
      console.log(res.data);
      
      localStorage.setItem("user", email);
      setUser({
        isLoading: true,
        username: res.data.user.username,
        email: email,
      })
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid email or password");
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Card className="p-10">
        <h1 className="text-2xl font-bold">Login</h1>
        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Enter Passwprd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </div>
  );
}
