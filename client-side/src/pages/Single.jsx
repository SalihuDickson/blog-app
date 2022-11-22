import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Menu from "../Components/Menu";
import edit from "../images/edit.png";
import remove from "../images/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState({});
  const { pathname } = useLocation();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const postId = pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        console.log(res);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img
          style={{ height: "450px", width: "100%", objectFit: "cover" }}
          src={`../uploads/${post.img}`}
          alt=""
        />
        <div className="user">
          <img src={post.userImage} alt="" />
          <div className="info">
            <span>{post.username}</span>
            <p>{moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser?.username === post.username && (
            <div className="edit">
              <Link to="/write?edit=2" state={post}>
                <img src={edit} alt="" />
              </Link>
              <img src={remove} alt="" onClick={handleDelete} />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
