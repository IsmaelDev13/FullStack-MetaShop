/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { Metadata } from "../layout/Metadata";
import Person from "@mui/icons-material/Person";
import MailOutline from "@mui/icons-material/MailOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Sidebar } from "./Sidebar";
import { useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import { Loader } from "../layout/Loader/Loader";

interface NewProductProps {
  history: any;
}

export const UpdateUser: React.FC<NewProductProps> = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { loading, error, user } = useSelector(
    (state: any) => state.userDetails
  );
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state: any) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState<any>("");
  const [role, setRole] = useState("");

  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
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
      alert.success("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId, history]);

  const updateUserSubmitHandler = (e: any) => {
    e.preventDefault();

    const myForm: any = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <Metadata title="Update User | Admin" />
      <div>
        <Sidebar />
        <div className="flex flex-col items-center justify-center mx-auto">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="transition-all focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg p-16 rounded-l-xl "
              onSubmit={updateUserSubmitHandler}
              encType="multipart/form-data"
            >
              <h1 className="font-bold text-xl italic uppercase">
                Update User
              </h1>
              <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md ">
                <Person className="mx-4" />
                <input
                  className="focus-within:outline-none flex-grow"
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex border-2 border-gray-500   hover:border-black p-4 hover:shadow-md ">
                <MailOutline className="mx-4" />
                <input
                  className="focus-within:outline-none "
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md ">
                <VerifiedUserIcon className="mx-4" />
                <select
                  className="appearance-none cursor-pointer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                size="large"
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update User
              </Button>
            </form>
          )}
        </div>{" "}
      </div>
    </Fragment>
  );
};
