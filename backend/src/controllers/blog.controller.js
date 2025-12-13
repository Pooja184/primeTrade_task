import { count } from "console";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comments.model.js";
import fs from "fs";

export const addBlog = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Blog image is required",
      });
    }

    const cloudinaryResult = await uploadToCloudinary(req.file.path);

    const blog = await Blog.create({
      title,
      description,
      image: cloudinaryResult.url,
      imagePublicId: cloudinaryResult.public_id,
      author: userId,
    });

    fs.unlinkSync(req.file.path);

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All Blogs",
      blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const userId = req.userId;
    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { text, parentCommentId } = req.body;
    const userId = req.userId;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const comment = await Comment.create({
      blog: blogId,
      author: userId,
      text,
      parentComment: parentCommentId || null,
    });

    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: comment._id },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    // 1️⃣ Fetch only top-level comments
    const comments = await Comment.find({
      blog: blogId,
      parentComment: null,
    })
      .populate("author", "name email")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Get Comments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, description } = req.body;
    const userId = req.userId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this blog",
      });
    }

    if (title) blog.title = title;
    if (description) blog.description = description;

    if (req.file) {
      await cloudinary.uploader.destroy(blog.imagePublicId);

      const uploadResult = await uploadToCloudinary(req.file.path);

      blog.image = uploadResult.url;
      blog.imagePublicId = uploadResult.public_id;

      fs.unlinkSync(req.file.path);
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Edit Blog Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update blog",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.userId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this blog",
      });
    }

    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};
