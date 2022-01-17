import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { Metadata } from "../layout/Metadata";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpeelcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Sidebar } from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

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

export const NewProduct: React.FC<NewProductProps> = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector(
    (state: any) => state.newProduct
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState<any>(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState<any>(0);
  const [images, setImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, history]);

  const createProductSubmitHandler = (e: any) => {
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
    dispatch(createProduct(myForm));
  };

  const createProductImageChange = (e: any) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
      <Metadata title="Create Product | Admin" />
      <div className="h-full">
        <Sidebar />
        <div className="flex flex-col items-center">
          <form
            className="transition-all focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg md:p-16 rounded-l-xl "
            onSubmit={createProductSubmitHandler}
            encType="multipart/form-data"
          >
            <h1 className="font-bold text-3xl italic uppercase">
              Create Product
            </h1>
            <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md ">
              <SpeelcheckIcon className="mx-4" />
              <input
                className="focus-within:outline-none flex-grow"
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                className="appearance-none cursor-pointer"
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
                onChange={createProductImageChange}
              />
            </div>
            <div className="flex overflow-x-scroll scrollbar-hide">
              {imagesPreview.map((image: any, i: any) => (
                <img
                  className="h-20 w-20 object-cover"
                  key={i}
                  src={image}
                  alt="Product Preview"
                />
              ))}
            </div>
            <Button
              color="success"
              size="large"
              variant="contained"
              type="submit"
              disabled={loading ? true : false}
            >
              Create Product
            </Button>
          </form>
        </div>{" "}
      </div>
    </Fragment>
  );
};
