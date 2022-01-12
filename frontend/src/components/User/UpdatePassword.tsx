import React, { Fragment, useRef, useState, useEffect } from "react";
import { Loader } from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_RESET,
} from "../../constants/userConstants";
import { Metadata } from "../layout/Metadata";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
interface UpdatePasswordProps {
  history: any;
}

export const UpdatePassword: React.FC<UpdatePasswordProps> = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, isUpdated, loading } = useSelector(
    (state: any) => state.profile
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e: any) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      history.push("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Change Password" />
          <div className=" grid place-items-center mx-auto  p-20">
            <div>
              <form
                className="transition-all focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg p-16 rounded-l-xl"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <h2 className="font-bold antialiased font-sans text-2xl">
                  Update Password
                </h2>
                <div className="border-2 border-gray-500  hover:border-black p-4">
                  <VpnKeyIcon className="mx-4" />
                  <input
                    type="password"
                    className="focus-within:outline-none flex-grow bg-transparent"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="border-2 border-gray-500  hover:border-black p-4">
                  <LockOpenIcon className="mx-4" />
                  <input
                    type="password"
                    className="focus-within:outline-none flex-grow bg-transparent"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="border-2 border-gray-500  hover:border-black p-4">
                  <LockIcon className="mx-4" />
                  <input
                    type="password"
                    className="focus-within:outline-none flex-grow bg-transparent"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  className="bg-black text-white w-full p-3 font-sans font-bold hover:bg-gray-700 cursor-pointer rounded-sm shadow-md"
                  type="submit"
                  value="Change Password"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
