import { useEffect } from "react";
import "./styling/singlePost.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const publicFolder = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.desc);
  const [updateMode, setUpdateMode] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const isAdmin = user?.user.isAdmin === true;
  console.log("isAdmin", isAdmin);

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Är du säker på att du vill ta bort denna kommentar?")) {
      try {
        await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComments(comments.filter((comment) => comment._id !== commentId));
      } catch (err) {
        console.error("Fel vid borttagning av kommentar:", err);
      }
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`http://localhost:5000/api/posts/${path}`);
      console.log(res);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      if (res.data) {
        setPost(res.data);
      } else {
        console.log("No post found");
      }
    };
    getPost();
  }, [path]);

  useEffect(() => {
    const fetchComments = async () => {
      if (post._id) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/comments/${post._id}`
          );
          setComments(res.data);
        } catch (err) {
          console.error("Error fetching comments:", err);
        }
      }
    };
    fetchComments();
  }, [post._id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${path}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            username: user.user.username,
          },
        });
        window.location.replace("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${path}`,
        {
          username: user.user.username,
          title: title,
          desc: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      window.location.replace(`/post/${path}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        {
          body: commentBody,
          username: user.user.username,
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, res.data]);
      setCommentBody("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={
            post.photo
              ? publicFolder + post.photo
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbudhE7sqEe9E4XoW5UUZ-6ci3QCF0ED9DOmXb8W26bA&s"
          }
          alt="Blog post image"
        />
        {updateMode ? (
          <div className="singlePostUpdate">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="singlePostTitleInput"
              // placeholder="Title"
            />
          </div>
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.username === user?.user.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">{post.username}</b>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}

        <div>
          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div>
                <p className="commentUsername">{comment.username}:</p>
                <p className="commentDate">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="commentBody">{comment.body}</p>
              {isAdmin && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="deleteCommentButton"
                >
                  Ta bort kommentar
                </button>
              )}
            </div>
          ))}
          {token && (
            <div className="commentForm">
              <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                className="commentTextarea"
              />
              <button onClick={handleCommentSubmit} className="commentButton">
                Skicka kommentar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
