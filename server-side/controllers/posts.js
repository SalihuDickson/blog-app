import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const addPost = async (req, res) => {
  const { title, desc, img, cat } = req.body;
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized access");

  jwt.verify(
    token,
    "myunnessecarilyprobablypoorlyspelledspecificsecretkey",
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(401).json("token is not valid");
      }

      const q = "INSERT INTO posts(title, posts.desc, img, uid, cat) VALUES(?)";

      const values = [title, desc, img, data.id, cat];

      db.query(q, [values], (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }

        return res.json("post has been created");
      });
    }
  );
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const q =
    "SELECT *, u.img AS userImage FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data[0]);
  });
};

export const getPosts = async (req, res) => {
  const { cat } = req.query;
  console.log(req.query);
  const q = cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";
  console.log(cat);

  db.query(q, [cat], (err, data) => {
    if (err) return res.status(500).send(err);
    console.log(q);

    return res.status(200).json(data);
  });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized access");

  jwt.verify(
    token,
    "myunnessecarilyprobablypoorlyspelledspecificsecretkey",
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(401).json("token is not valid");
      }

      const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

      db.query(q, [id, data.id], (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }

        return res.json("post has been deleted");
      });
    }
  );
};

export const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { title, desc, img, cat } = req.body;
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized access");

  jwt.verify(
    token,
    "myunnessecarilyprobablypoorlyspelledspecificsecretkey",
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(401).json("token is not valid");
      }

      const q =
        "UPDATE posts SET title=?, posts.desc=?, img=?, cat=? WHERE id=? AND uid=?";

      const values = [title, desc, img, cat, postId, data.id];

      db.query(q, [...values], (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }

        return res.json("post has been updated");
      });
    }
  );
};
