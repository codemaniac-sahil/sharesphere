import React, { useEffect, useState } from "react";
import NavbarAll from "./NavbarAll";
import { useParams } from "react-router-dom";

function User() {
  const [userinfo, setUserinfo] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:8000/user/getuser/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserinfo(data);
      });
  }, []);
  console.log(userinfo);
  return (
    <>
      <NavbarAll />
      <div>Hello World</div>
    </>
  );
}

export default User;
