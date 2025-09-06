import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const ProductPopupForm = ({ Close, data, exid,refreshProducts }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [details, setDetails] = useState("");
  // const [exhibitionid, setexhibitionid] = useState("");
console.log('exid ' ,exid)
  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  const formData = new FormData();
  formData.append("product_name", productName);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("details", details);
  formData.append("createdBy", data);
  formData.append("exhibitionid", exid);
  console.log('exhibitionid' , exid)
      if (productImage) {
        formData.append("image", productImage);
      }
      const response = await axios.post("/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {
        toast.success("✅ Product added successfully!");
        // ✅ Refresh list immediately
        if (refreshProducts) {
          await refreshProducts();
        }
        Close();
      } else {
        toast.error("❌ Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while adding product");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-green-700">➕ Add Product</h2>
          <button
            onClick={Close}
            className="text-gray-500 hover:text-red-500 text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="E.g. Electronics, Clothing"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProductImage(e.target.files[0])}
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Details
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter product details"
              required
              rows={4}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={Close}
              className="px-5 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 shadow-md transition"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductPopupForm;
