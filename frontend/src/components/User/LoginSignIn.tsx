import React, { Fragment, useRef, useState, useEffect } from "react";
import { Loader } from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";

interface LoginSignInProps {
  history: any;
}

export const LoginSignIn: React.FC<LoginSignInProps> = ({ history }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const [clickedLogin, setClickedLogin] = useState(true);
  const [clickedRegister, setClickedRegister] = useState(false);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { error, loading, isAuthenticated } = useSelector(
    (state: any) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState<any>("");
  const [avatarPreview, setAvatarPreview] = useState<any>("");

  const loginSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    console.log("Login Form Submitted");
  };
  const registerSubmit = (e: any) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e: any) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, alert, error, isAuthenticated, redirect]);

  const switchTabs = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    tab: string
  ) => {
    if (tab === "login") {
      setClickedLogin(true);
      setClickedRegister(false);
    }
    if (tab === "register") {
      setClickedRegister(true);
      setClickedLogin(false);
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="grid place-content-center font-sans border-b-2 p-10 ">
            <div className="">
              <div className="">
                <div className="font-sans flex items-center text-center w-full justify-evenly p-4 ">
                  <p
                    className={
                      clickedLogin
                        ? "bg-black text-white font-bold cursor-pointer border-2 border-black p-2 w-1/2"
                        : "bg-white text-black cursor-pointer border-black border-2 p-2 w-1/2"
                    }
                    onClick={(e) => switchTabs(e, "login")}
                  >
                    LOGIN
                  </p>
                  <p
                    className={
                      clickedRegister
                        ? "bg-black text-white font-bold cursor-pointer border-2 border-black p-2 w-1/2"
                        : "border-black border-2 w-1/2 bg-white text-black p-2 cursor-pointer"
                    }
                    onClick={(e) => switchTabs(e, "register")}
                  >
                    REGISTER
                  </p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                ref={loginTab}
                onSubmit={loginSubmit}
                className={
                  clickedLogin
                    ? "transition-all focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg p-16 rounded-l-xl "
                    : "transition-x-full  transform duration-300 blur-3xl ease-in"
                }
              >
                <h1 className="font-bold antialiased font-sans text-xl md:text-2xl">
                  Welcome to MetaShop{" "}
                </h1>
                <div className="flex border-2 border-gray-500  hover:border-black p-4 ">
                  <MailOutlineIcon className="mx-4" />
                  <input
                    className="focus-within:outline-none flex-grow active:bg-transparent"
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="flex border-2 border-gray-500  hover:border-black p-4">
                  <LockOpenIcon className="mx-4" />
                  <input
                    className="focus-within:outline-none flex-grow bg-transparent"
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <input
                  className="bg-black text-white w-full p-3 font-sans font-bold hover:bg-gray-700 cursor-pointer "
                  type="submit"
                  value="Login"
                />
              </form>
              <form
                className={
                  clickedRegister
                    ? "transition-all -translate-y-40 bg-white focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg rounded-r-xl p-5"
                    : "hidden"
                }
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="border-2 border-gray-500  hover:border-black p-4">
                  <FaceIcon className="mx-2" />
                  <input
                    className="focus-within:outline-none flex-grow"
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="border-2 border-gray-500  hover:border-black p-4">
                  <MailOutlineIcon className="mx-2" />
                  <input
                    className="focus-within:outline-none flex-grow"
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className=" border-2 border-gray-500  hover:border-black  p-6">
                  <LockOpenIcon className="mx-2" />
                  <input
                    className="focus-within:outline-none flex-grow"
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="border-2 border-gray-500  hover:border-black p-4">
                  <img src="" alt="" />
                  <input
                    className="focus-within:outline-none flex-grow"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  className="bg-black text-white w-full p-3 font-sans font-bold hover:bg-gray-700 cursor-pointer "
                  type="submit"
                  value="Register"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
