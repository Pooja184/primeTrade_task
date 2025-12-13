import { Router } from "express";
import { tokenDecoder } from "../middlewares/tokenDecoder.js";
import { upload } from "../config/multer.js";
import {
  addBlog,
  addComment,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlogComments,
  getSingleBlog,
  getUserBlogs,
} from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.post("/add-blog", tokenDecoder, upload.single("image"), addBlog);

blogRouter.get("/all-blogs", getAllBlogs);
blogRouter.get("/my-blogs", tokenDecoder, getUserBlogs);
blogRouter.get("/:blogId", tokenDecoder, getSingleBlog);

blogRouter.post("/:blogId/comments", tokenDecoder, addComment);
blogRouter.get("/:blogId/comments", tokenDecoder, getBlogComments);

blogRouter.put("/:blogId", tokenDecoder, upload.single("image"), editBlog);
blogRouter.delete("/:blogId", tokenDecoder, deleteBlog);

export default blogRouter;
