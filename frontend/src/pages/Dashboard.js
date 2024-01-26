import React, { useEffect, useState } from "react";
import NavbarAll from "../components/NavbarAll";
import "../styles/dashboard.css";
// import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import FollowList from "../components/FollowList";
import { NavLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

function Dashboard() {
  const [userinfo, setUserInfo] = useState([]);
  const [comment, setComment] = useState("");
  const [updatedUserInfo, setUpdatedUserInfo] = useState([]);
  const [likeActive, setLikeActive] = useState(false);
  const handleLike = () => {
    setLikeActive(!likeActive);
  };
  console.log(userinfo);
  const addComment = async (postId) => {
    try {
      // Make the API call to add the comment
      await axios.post(
        `http://localhost:8000/post/${postId}/addcomment`,
        {
          comment: comment,
        },
        { withCredentials: true }
      );

      // Fetch the updated user information after adding the comment
      const response = await fetch(`http://localhost:8000/post/getallpost`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const updatedData = await response.json();

      // Update the state with the new comments
      setUserInfo(updatedData);
      setUpdatedUserInfo(updatedData);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  useEffect(() => {
    // Set the initial state when the component mounts
    fetch(`http://localhost:8000/post/getallpost`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
        setUpdatedUserInfo(data);
      });
  }, []);
  return (
    <>
      <NavbarAll />

      <div className="user-post-container">
        {updatedUserInfo.length !== 0 ? (
          updatedUserInfo.map((user) => (
            <div key={user.postId} className="userinfo">
              <div className="userinfo-post">
                <div className="userinfo-post-user">
                  <div className="userinfo-post-user-img">
                    {user.createdBy.personalDetails.map((profilepic) => (
                      <>
                        <img src={profilepic.profilePic} alt="profilepic" />
                      </>
                    ))}
                  </div>
                  <div className="userinfo-post-user-username">
                    <NavLink to={`/user/${user.createdBy._id}`}>
                      <p>{user.createdBy.username}</p>
                    </NavLink>
                  </div>
                </div>
                <div className="userinfo-post-post">
                  <div className="userinfo-post-post-image">
                    <img src={user.post} alt="post" />
                  </div>
                </div>
                <div className="post-like">
                  {likeActive === false ? (
                    // <FaRegHeart />
                    <FaRegHeart onClick={handleLike} />
                  ) : (
                    <FaHeart fill="red" onClick={handleLike} />
                  )}
                </div>

                <div className="user-post-content">{user.content}</div>
                <div className="userinfo-post-comments">
                  {user.comments.length <= 2 ? (
                    user.comments.map((comment) => (
                      <>
                        <div className="user-comment-comment">
                          <div className="user-comment">
                            <h5>{comment.user.username}</h5>
                            <p>{comment.comment}</p>
                          </div>
                          <div className="reply">
                            {comment.reply.length <= 1 ? (
                              comment.reply.map((reply) => (
                                <>
                                  <h5>{reply.user.username}</h5>
                                  <p>{reply.replyText}</p>
                                </>
                              ))
                            ) : comment.reply.length === 0 ? (
                              ""
                            ) : (
                              <NavLink>View all replies</NavLink>
                            )}
                          </div>
                        </div>
                      </>
                    ))
                  ) : (
                    <>
                      <div className="post-info">
                        <NavLink to={`/post/${user._id}`}>
                          View all {user.comments.length} comment
                        </NavLink>
                      </div>
                    </>
                  )}
                </div>
                <div className="add-comment">
                  <input
                    type="text"
                    value={comment}
                    placeholder="Enter your comment"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button onClick={() => addComment(user._id)}>Comment</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="follow-someone">
            <h2>You didn't follow anyone; follow someone to see the post</h2>
          </div>
        )}
      </div>
      <FollowList />
    </>
  );
}

export default Dashboard;
