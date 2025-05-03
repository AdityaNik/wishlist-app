import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useAtomState } from "@zedux/react";
import { userState } from "@/store/atoms/user";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useAtomState(userState)
  const navigate = useNavigate();

  const handleRegister = async () => {

    const res = await axios.post("https://wishlist-app-aoix.onrender.com/auth/register", {
      email,
      username,
      password,
    });
    console.log(res.data);

    localStorage.setItem("user", email);
    setUser({
      isLoading: true,
      username: res.data.username,
      email: email,
    });
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Card className="p-10">
        <h1 className="text-2xl font-bold">Register</h1>
        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Enter Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Enter Passwprd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleRegister}
        >
          Register
        </Button>
      </Card>
    </div>
  );
}
