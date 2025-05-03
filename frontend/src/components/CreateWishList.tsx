import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "@zedux/react";
import { userState } from "@/store/atoms/user";
import axios from "axios";


export default function CreateWishList() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();;
    const user = useAtomValue(userState);

    const createWishList = async () => {
        // Logic to create a wishlist
        const res = await axios.post('http://localhost:5000/wishlist/add', {
            name,
            description,
            ownerEmail: user.email,
        });

        console.log(res.data);
        if (res.data) {
            console.log("Wishlist created successfully");
            navigate("/");
        } else {
            console.log("Error creating wishlist");
        }
    }

    return (
        <div>
            <Card className="p-10 mt-20 w-1/3 mx-auto">
                <CardTitle className="font-bold text-2xl">Create Wishlist</CardTitle>
                <div className="flex flex-col gap-4">
                    <Input
                        type="text"
                        value={name}
                        placeholder="Enter wishlist name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        value={description}
                        type="text"
                        placeholder="Enter wishlist Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button onClick={() => {
                        createWishList();
                    }}>
                        Create
                    </Button>
                </div>
            </Card>
        </div>
    )
}   