import React, { useEffect, useState } from "react";
import NavbarAll from "../components/NavbarAll";
import "../styles/dashboard.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import FollowList from "../components/FollowList";

function Dashboard() {
  const [userinfo, setUserInfo] = useState([]);
  // const [followListRendered, setFollowListRendered] = useState(false);

  // const [userinfo, setUserInfo] = useState([]);

  useEffect(() => {
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
      });
  }, []);
  return (
    <>
      <NavbarAll />

      {/* <div className="user-post-container">
        {userinfo.length !== 0 ? (
          userinfo.map((user) => (
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
                    <p>{user.createdBy.username}</p>
                  </div>
                </div>
                <div className="userinfo-post-post">
                  <div className="userinfo-post-post-image">
                    <img src={user.post} alt="post" />
                  </div>
                </div>
                <div className="post-like">
                  <AiFillLike />
                  <AiOutlineLike />
                </div>

                <div className="user-post-content">{user.content}</div>
                <div className="userinfo-post-comments">
                  {user.comments.map((comment) => (
                    <>
                      <div className="user-comment-comment">
                        <div className="user-comment">
                          <h5>{comment.user.username}</h5>
                          <p>{comment.comment}</p>
                        </div>
                        <div className="reply">
                          {comment.reply.map((reply) => (
                            <>
                              <h5>{reply.user.username}</h5>
                              <p>{reply.replyText}</p>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className="add-comment">
                  <input type="text" />
                  <button>Comment</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            {!followListRendered && (
              <div className="follow-someone">
                <h2>
                  You didn't follow anyone; follow someone to see the post
                </h2>
                <FollowList />
                {setFollowListRendered(true)}
              </div>
            )}
          </>
        )}
      </div> */}

      <div className="user-post-container">
        {userinfo.length !== 0 ? (
          userinfo.map((user) => (
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
                    <p>{user.createdBy.username}</p>
                  </div>
                </div>
                <div className="userinfo-post-post">
                  <div className="userinfo-post-post-image">
                    <img src={user.post} alt="post" />
                  </div>
                </div>
                <div className="post-like">
                  <AiFillLike />
                  <AiOutlineLike />
                </div>

                <div className="user-post-content">{user.content}</div>
                <div className="userinfo-post-comments">
                  {user.comments.map((comment) => (
                    <>
                      <div className="user-comment-comment">
                        <div className="user-comment">
                          <h5>{comment.user.username}</h5>
                          <p>{comment.comment}</p>
                        </div>
                        <div className="reply">
                          {comment.reply.map((reply) => (
                            <>
                              <h5>{reply.user.username}</h5>
                              <p>{reply.replyText}</p>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className="add-comment">
                  <input type="text" />
                  <button>Comment</button>
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
