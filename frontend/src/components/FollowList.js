import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FollowList() {
  const [user1, setUser1] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/user/getalluser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser1(data);
      });
  }, []);

  const addFollow = async (userid) => {
    console.log(userid);
    const user = {
      usertofollow: userid,
    };
    console.log(JSON.stringify(user));
    const res = await fetch("http://localhost:8000/user/addfollow", {
      method: "PUT",
      body: JSON.stringify(user),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
    if (res.ok) {
      console.log("User created Successfully");
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div className="user-follow-container">
        {user1.map((usertofollow) => (
          <div className="user-follow-box">
            <div className="user-follow-box-img">
              {usertofollow.personalDetails.map((usertofollowpersonal) => (
                <img src={usertofollowpersonal.profilePic} alt="img" />
              ))}
            </div>
            <div className="user-follow-box-text">
              <h5>{usertofollow.username}</h5>
              <p>{usertofollow.fullName}</p>
              <button onClick={() => addFollow(usertofollow._id)}>
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FollowList;
