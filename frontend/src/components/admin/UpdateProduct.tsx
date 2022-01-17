import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { Metadata } from "../layout/Metadata";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpeelcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Sidebar } from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";

const categories = [
  "Laptop",
  "MacBook",
  "Tops",
  "Bottom",
  "Camera",
  "SmartPhones",
];

interface NewProductProps {
  history: any;
}

export const UpdateProduct: React.FC<NewProductProps> = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { error, product } = useSelector((state: any) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state: any) => state.product);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<any>(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState<any>(0);
  const [images, setImages] = useState<any>([]);
  const [oldImages, setOldImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const productId: any = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, isUpdated, productId, product, updateError]);

  const updateProductSubmitHandler = (e: any) => {
    e.preventDefault();

    const myForm: any = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image: any) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImageChange = (e: any) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old: any) => [...old, reader.result]);
          setImages((old: any) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <Metadata title="Update Product | Admin " />
      <div>
        <Sidebar />
        <div className="flex flex-col items-center">
          <form
            className="transition-all focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg md:p-16 rounded-l-xl "
            onSubmit={updateProductSubmitHandler}
            encType="multipart/form-data"
          >
            <h1 className="font-bold text-3xl italic uppercase">
              Update Product
            </h1>
            <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md ">
              <SpeelcheckIcon className="mx-4" />
              <input
                className="focus-within:outline-none flex-grow"
                type="text"
                placeholder="Product Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md ">
              <AttachMoneyIcon className="mx-4" />
              <input
                className="focus-within:outline-none flex-grow"
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div className="flex border-2 border-gray-500  hover:border-black p-4 hover:shadow-md ">
              <DescriptionIcon className="mx-4" />
              <textarea
                className="focus-within:outline-none flex-grow"
                placeholder="Product Description"
                value={description}
                cols={30}
                rows={1}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md ">
              <AccountTreeIcon className="mx-4" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md ">
              <StorageIcon className="mx-4" />
              <input
                className="focus-within:outline-none flex-grow"
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>
            <div>
              <input
                className="text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-black
                hover:file:bg-violet-100 file:hover:cursor-pointer"
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={updateProductImageChange}
              />
            </div>
            <div className="flex overflow-x-scroll scrollbar-hide">
              {oldImages &&
                oldImages.map((image: any, i: any) => (
                  <img
                    className="h-20 w-20 object-contain"
                    key={i}
                    src={image.url}
                    alt="Old Product Preview"
                  />
                ))}
            </div>
            <div className="flex overflow-x-scroll scrollbar-hide">
              {imagesPreview.map((image: any, i: any) => (
                <img
                  className="h-20 w-20 object-contain"
                  key={i}
                  src={image}
                  alt="Product Preview"
                />
              ))}
            </div>
            <Button
              type="submit"
              color="success"
              size="large"
              variant="contained"
              disabled={loading ? true : false}
              style={{ marginBottom: "20px" }}
            >
              Update Product
            </Button>
          </form>
        </div>{" "}
      </div>
    </Fragment>
  );
};
