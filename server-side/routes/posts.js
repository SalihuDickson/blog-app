import express from "express";
import {
  getPost,
  getPosts,
  addPost,
  deletePost,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

export default router;
