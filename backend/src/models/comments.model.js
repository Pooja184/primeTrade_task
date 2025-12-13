import mongoose from "mongoose";


const commentsSchema=new mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    text:{
        type:String,
        required:true,
    },
    parentCommentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:null,
    },
    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
},{timestamps:true});

 const Comment=mongoose.models.Comment || mongoose.model("Comment",commentsSchema)

 export default Comment