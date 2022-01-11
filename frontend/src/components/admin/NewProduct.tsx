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
import { Navigate, useNavigate } from "react-router-dom";

const categories = [
  "Laptop",
  "MacBook",
  "Tops",
  "Bottom",
  "Camera",
  "SmartPhones",
];

interface NewProductProps {}

export const NewProduct: React.FC<NewProductProps> = ({}) => {
  const navigate = useNavigate();
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
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success]);

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
      <Metadata title="Create " />
      <div>
        <Sidebar />
        <div>
          <form
            onSubmit={createProductSubmitHandler}
            encType="multipart/form-data"
          >
            <h1>Create Product</h1>
            <div>
              <SpeelcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                cols={30}
                rows={1}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={createProductImageChange}
              />
            </div>
            <div>
              {imagesPreview.map((image: any, i: any) => (
                <img key={i} src={image} alt="Product Preview" />
              ))}
            </div>
            <Button type="submit" disabled={loading ? true : false}>
              Create Product
            </Button>
          </form>
        </div>{" "}
      </div>
    </Fragment>
  );
};
