import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout"

const Profile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user.email)
  return (
      <div>
        <Logout/>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
  );
};

export default Profile;