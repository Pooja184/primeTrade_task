import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    trim: true,
      maxlength: 150,
  },
  image:{
    type:String,
    required:true,
  },
  imagePublicId:{
    type:String,
    required:true,
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Auth",
    required:true
  },
  description:{
    type:String,
    required:true,
    trim: true,
      maxlength: 5000,
  }

}, { timestamps: true });

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;