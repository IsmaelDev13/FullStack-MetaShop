import React, { Fragment, useState, useEffect } from "react";
import { Loader } from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { Metadata } from "../layout/Metadata";

interface UpdateProfileProps {
  history: any;
}

export const UpdateProfile: React.FC<UpdateProfileProps> = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state: any) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state: any) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<any>();
  const [avatarPreview, setAvatarPreview] = useState<any>("");

  const updateProfileSubmit = (e: any) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };
  const updateProfileDataChange = (e: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Update Profile" />
          <div className="h-screen flex flex-col items-center justify-center mx-auto">
            <div>
              <form
                className="transition-all focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg p-9 md:p-14 rounded-l-xl "
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <h2 className="font-bold antialiased font-sans text-2xl">
                  Update Profile
                </h2>
                <div className="border-2 border-gray-500  hover:border-black p-4">
                  <FaceIcon className="mx-4" />
                  <input
                    className="focus-within:outline-none flex-grow bg-transparent"
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="border-2 border-gray-500  hover:border-black p-4">
                  <MailOutlineIcon className="mx-4" />
                  <input
                    className="focus-within:outline-none flex-grow bg-transparent"
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex items-center flex-row space-x-2">
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={avatarPreview}
                    alt="Avatar Preview"
                  />
                  <input
                    className="text-gray-500 text-xs cursor-pointer file:mr-4 file:py-2 
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-black
                  hover:file:bg-violet-100 file:hover:cursor-pointer "
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  className="bg-black text-white w-full p-3 font-sans font-bold hover:bg-gray-700 cursor-pointer rounded-sm shadow-md "
                  type="submit"
                  value="Update Profile"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
