import React, { Fragment, useRef, useState, useEffect } from "react";
import { Loader } from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useLocation, useNavigate } from "react-router-dom";

interface LoginSignInProps {}

export const LoginSignIn: React.FC<LoginSignInProps> = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const [clickedLogin, setClickedLogin] = useState(false);
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
      navigate(redirect);
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
          <div>
            <div>
              <div>
                <div>
                  <p
                    className={clickedLogin ? "" : ""}
                    onClick={(e) => switchTabs(e, "login")}
                  >
                    LOGIN
                  </p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form ref={loginTab} onSubmit={loginSubmit}>
                <div>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Login" />
              </form>
              <form
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div>
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div>
                  <img src="" alt="" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
