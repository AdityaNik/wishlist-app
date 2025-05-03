import { userState } from "@/store/atoms/user";
import { useAtomValue } from "@zedux/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Dashboard() {
  const user = useAtomValue(userState);
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState([]);
  useEffect(() => {
    getWishlists();
  }, []);

  if (!user) {
    return null; // OR render fallback UI
  }

  console.log(user);


  const openWishlist = (id: string) => {
    navigate(`/wishlist/${id}`);
  };

  const getWishlists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/wishlist/");
      const data = await response.data;
      console.log("Wishlists: ", data);
      setWishlists(data);
    } catch (error) {
      console.error("Error fetching wishlists:", error);
    }
  };

  if(!user.isLoading){
    return <div className="text-2xl mt-28 flex justify-center items-center">
      You are not logged in
    </div>;
  }

  return (
    <div className="mt-28 ml-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wishlists.map((w) => (
          <div
            key={w._id}
            className="border p-4 rounded shadow cursor-pointer hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold">{w.name}</h2>
            <h2 className="text-md font-normal">{w.description}</h2>
            <p className="text-sm text-gray-500">Created by: {w.ownerEmail}</p>
            <Button className="mt-4" onClick={() => openWishlist(w._id)}>Open</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
