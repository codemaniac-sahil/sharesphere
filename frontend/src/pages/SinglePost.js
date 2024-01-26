import React, { useEffect, useState } from "react";
import NavbarAll from "../components/NavbarAll";
import { NavLink, useParams } from "react-router-dom";
import "../styles/singlepost.css";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";

import axios from "axios";
function SinglePost() {
  const [replyText, setReplyText] = useState("");
  const [commentid, setCommentid] = useState("");
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [updatedUserInfo, setUpdatedUserInfo] = useState([]);
  const { id } = useParams();
  const [replyactivate, setReplyactivate] = useState(false);
  const [likeActive, setLikeActive] = useState(false);
  const [commentActive, setCommentActive] = useState(false);
  const handlereply = (commentID) => {
    setReplyactivate(!replyactivate);
    setCommentid(commentID);
    console.log(commentid);
  };

  const handleLike = async (postId) => {
    console.log(postId);
    // console.log(commentid);
    await axios.post(
      `http://localhost:8000/post/${postId}/addlike`,

      { withCredentials: true }
    );

    const response = await fetch(
      `http://localhost:8000/post/getsinglepost/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const updatedData = await response.json();

    // Update the state with the new comments
    setPost(updatedData);
    setUpdatedUserInfo(updatedData);
    // setReplyText("");
    setLikeActive(!likeActive);
  };

  const handleActiveComment = () => {
    setCommentActive(!commentActive);
  };
  const addreply = async (postId) => {
    // console.log(postId);
    // console.log(commentid);
    await axios.post(
      `http://localhost:8000/post/addreply/${postId}/${commentid}`,
      {
        replytext: replyText,
      },
      { withCredentials: true }
    );

    const response = await fetch(
      `http://localhost:8000/post/getsinglepost/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const updatedData = await response.json();

    // Update the state with the new comments
    setPost(updatedData);
    setUpdatedUserInfo(updatedData);
    setReplyText("");
  };

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
      const response = await fetch(
        `http://localhost:8000/post/getsinglepost/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const updatedData = await response.json();

      // Update the state with the new comments
      setPost(updatedData);
      setUpdatedUserInfo(updatedData);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/post/getsinglepost/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setUpdatedUserInfo(data);
      });
  }, [id]);
  console.log(post);
  return (
    <>
      <NavbarAll />
      <div className="post-section">
        {updatedUserInfo.map((singlepost) => (
          <>
            <div className="post-content">
              <div className="post-info-ctx">
                <div className="post-info-user-info">
                  <div className="user-info">
                    <div className="user-info-image">
                      {singlepost.createdBy.personalDetails.map(
                        (userdetails) => (
                          <>
                            <img
                              src={userdetails.profilePic}
                              alt={userdetails._id}
                            />
                          </>
                        )
                      )}
                    </div>
                    <NavLink to={`/user/${singlepost.createdBy._id}`}>
                      <p>{singlepost.createdBy.username}</p>
                    </NavLink>
                  </div>
                </div>
                <div className="post-content-image">
                  <img src={singlepost.post} alt={singlepost._id} />
                </div>
                <div className="post-like-comment">
                  <div className="single-post-like">
                    {likeActive === false ? (
                      // <FaRegHeart />
                      <>
                        <FaRegHeart
                          onClick={() => handleLike(singlepost._id)}
                        />
                        {singlepost.likes.length}
                      </>
                    ) : (
                      <>
                        <FaHeart fill="red" onClick={handleLike} />
                        {singlepost.likes.length}
                      </>
                    )}
                  </div>
                  <div className="post-comment">
                    <FaRegComment onClick={handleActiveComment} />
                    {singlepost.comments.length}
                  </div>
                </div>
                <div className="user-post-content">{singlepost.content}</div>
                <div className="user-post-comments">
                  {commentActive &&
                    singlepost.comments.map((comment) => (
                      <>
                        <div className="user-comment-comment">
                          <div className="user-comment">
                            <h5>{comment.user.username}</h5>
                            <p>{comment.comment}</p>
                          </div>
                          <div className="add-reply">
                            <button onClick={() => handlereply(comment._id)}>
                              Reply
                            </button>
                          </div>

                          <div className="reply">
                            {comment.reply.map((reply) => (
                              <>
                                <div className="reply-class">
                                  <h5>{reply.user.username}</h5>
                                  <p>{reply.replyText}</p>
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
              {replyactivate ? (
                <div className="add-comment">
                  <input
                    type="text"
                    value={replyText}
                    placeholder="Enter your reply"
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button onClick={() => addreply(singlepost._id)}>
                    Reply
                  </button>
                </div>
              ) : (
                <div className="add-comment">
                  <input
                    type="text"
                    value={comment}
                    placeholder="Enter your comment"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button onClick={() => addComment(singlepost._id)}>
                    Comment
                  </button>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default SinglePost;
