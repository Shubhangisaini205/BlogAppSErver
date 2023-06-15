const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, required: true },
        date: { type: String, required: true },
        likes: { type: Number, required: true },
        avatar:{type:String,required:true},
        comments: [
            {
                username: { type: String },
                content: { type: String }
            }
        ],
       userId:{ type: String, required: true }
    },{
        versionKey:false
    }
)

const BlogModel = mongoose.model("blog", BlogSchema)

module.exports = {
    BlogModel
}