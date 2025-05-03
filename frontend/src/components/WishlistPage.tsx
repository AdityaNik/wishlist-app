import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WishlistPage() {
  const { id } = useParams();
  const user = localStorage.getItem("user");

  const [products, setProducts] = useState<
    { _id: string, name: string; price: number; imageUrl: string; createdBy: string | null }[]
  >([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });
  const [wishlist, setWishlist] = useState<{ name?: string; description?: string; ownerEmail?: string }>({});

  useEffect(() => {
    getWishlist();
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://wishlist-app-aoix.onrender.com/product/");
      const data = await response.data;
      console.log("Products with id: ", data);
      const filteredProducts = data.filter((item: { wishlistId: string }) => item.wishlistId === id);
      console.log("Filtered Products: ", filteredProducts);
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getWishlist = async () => {
    try {
      console.log("Fetching wishlist with id: ", id);
      const response = await axios.get("https://wishlist-app-aoix.onrender.com/wishlist/" + id);
      const data = await response.data;
      console.log("wishllist with id: ", data);
      setWishlist(data);
    } catch (error) {
      console.error("Error fetching wishlists:", error);
    }
  };

  const addProduct = async () => {
    const res = await axios.post("https://wishlist-app-aoix.onrender.com/product/add", {
      wishlistId: id,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      imageUrl: newProduct.imageUrl,
      createdBy: user,
    });

    console.log(res.data);
    setProducts((prev) => {
      return [...prev, res.data];
    })
    if (res.data) {
      console.log("Product added successfully");
    } else {
      console.log("Error adding product");
    }
    
  };

  const deleteProduct = async (id: string) => {
    const res = await axios.delete("https://wishlist-app-aoix.onrender.com/product/delete/" + id);
    console.log(res.data);

    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Wishlist Name: {wishlist?.name}</h1>
      <h2 className="text-lg font-semibold mb-2">Description: {wishlist?.description}</h2>
      <h2 className="text-lg font-semibold mb-4">Created by: {wishlist?.ownerEmail}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded p-4 shadow flex flex-col gap-2"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-gray-600">${item.price}</p>
            <p className="text-sm text-gray-500">Added by: {item.createdBy}</p>
            {item.createdBy === user && (
              <button
                onClick={() => deleteProduct(item._id)}
                className="text-red-500 text-sm self-end hover:cursor-pointer"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Product Section */}
      <div className="border p-6 rounded shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add a new product</h2>
        <input
          type="text"
          placeholder="Product name"
          className="border w-full p-2 mb-2 rounded"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border w-full p-2 mb-2 rounded"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border w-full p-2 mb-4 rounded"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button
          onClick={addProduct}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
