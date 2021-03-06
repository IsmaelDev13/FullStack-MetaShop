/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Metadata } from "../layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../layout/Loader/Loader";
import { logoutUser } from "../../actions/userAction";

interface ProfileProps {
  history: any;
}

export const Profile: React.FC<ProfileProps> = ({ history }) => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector(
    (state: any) => state.user
  );
  const logout = () => {
    dispatch(logoutUser());
    if (!user) {
      history.push("/login");
    }
  };
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${user.name}'s Profile`} />
          <div className="h-full flex flex-col max-w-screen-2xl lg:grid grid-cols-4 mx-auto md:my-20 bg-gray-100 rounded-2xl shadow-lg">
            <div className="flex flex-col items-center flex-start col-span-2 md:p-20">
              <h1 className="font-bold text-4xl md:text-6xl  p-6 border-l-4 ">
                My Profile
              </h1>
              <img
                className=" h-40 w-40 md:w-72 md:h-72 rounded-full my-10 "
                src={user.avatar.url}
                alt={user.name}
              />
              <Link
                to="/me/update"
                className="border-2 py-4 px-6 text-md rounded-md hover: bg-black text-white font-sans"
              >
                Edit Profile
              </Link>
            </div>
            <div className="col-span-2 p-10 md:p-28 space-y-3 md:space-y-10 font-sans ">
              <div className="flex items-center space-x-6">
                <h4 className="text-2xl font-semibold">Name</h4>
                <p className="text-xl md:text-2xl ">{user.name}</p>
              </div>
              <div className="flex items-center space-x-6">
                <h4 className="text-2xl font-semibold">Email</h4>
                <p className="text-xl md:text-2xl ">{user.email}</p>
              </div>
              <div className="flex items-center space-x-6">
                <h4 className="text-2xl font-semibold">Joined On</h4>
                <p className="text-xl md:text-2xl ">
                  {String(user.createdAt).slice(0, 10)}
                </p>
              </div>
              <div className="flex flex-col space-y-4 md:space-y-10">
                <Link
                  to="/orders"
                  className=" px-6 py-2 bg-black text-white text-center text-xl shadow-lg rounded-md hover:bg-gray-700 cursor-pointer font-sans uppercase transition-transform hover:scale-105 duration-200 ease-in"
                >
                  My Orders
                </Link>
                <Link
                  to="/password/update"
                  className="px-6 py-2 bg-black text-white text-center text-xl shadow-lg rounded-md hover:bg-gray-700 cursor-pointer font-sans uppercase transition-transform hover:scale-105 duration-200 ease-in"
                >
                  Change Password
                </Link>
                <button
                  onClick={() => logout()}
                  className="px-6 py-2 bg-red-400 text-white text-center text-xl shadow-lg rounded-md hover:bg-red-600 cursor-pointer font-sans uppercase transition-transform hover:scale-105 duration-200 ease-in"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
