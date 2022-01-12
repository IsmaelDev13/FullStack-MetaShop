import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Metadata } from "../layout/Metadata";
import { useSelector } from "react-redux";
import { Loader } from "../layout/Loader/Loader";

interface ProfileProps {
  history: any;
}

export const Profile: React.FC<ProfileProps> = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector(
    (state: any) => state.user
  );
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
          <div>
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).slice(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
