import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // CHECK EXISTING USER
  const { email, username, password } = req.body;
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [email, username], (err, data) => {
    if (err) {
      console.log(email, username);
      console.log(err);
      return res.status(500).json(err);
    }
    if (data.length) return res.status(409).json("User already Exists");

    // HASH the passwords and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users (username, email, password) VALUES (?)";
    const values = [username, email, hash];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.status(200).json("User has been created");
    });
  });
};

("INSERT INTO users (username, email, 'password') VALUES ('test', 'test@email.com', '$2a$10$IMUI661nVySxE4DuNCcOfewynkJLvGIkxkHh3ImGzY2sBZVEJag1W');");

export const login = (req, res) => {
  // CHECK FOR USER
  const { username, password: userPassword } = req.body;

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    if (data.length === 0) {
      return res.status(404).json("user not found!");
    }

    // CHECK PASSWORD
    const correctPassword = bcrypt.compareSync(userPassword, data[0].password);
    if (!correctPassword) {
      return res.status(400).json("wrong user name or password");
    }

    const token = jwt.sign(
      {
        id: data[0].id,
      },
      "myunnessecarilyprobablypoorlyspelledspecificsecretkey"
    );
    const { password, ...userData } = data[0];

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userData);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("user has been logged out");
};
