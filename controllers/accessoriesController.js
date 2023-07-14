
const POST = require("../models/PostModel");
const commentModel = require("../models/commentModel");
// @routes = /job-post/:id (post req)
// @desc = Post req for companies to post comments on blogs
// @return = redirect to the same page

const postComment = async (req, res) => {
    const { comment } = req.body;
    const blog_id = req.params.id;

    try {
        console.log(req.user);
        const newComment = new commentModel({
            comment: comment,
            user_id: req.user.id,
            username: req.user.username,
            blog_id: blog_id
        });
        await newComment.save();

        // saving in blog-post
        const blog = await POST.findById(blog_id);
        blog.comments.push(newComment);
        await blog.save();

        res.status(200).redirect(`/job-post/${blog_id}`);

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Sever error" });
    }
}

// @routes = /job-post/like/:id (get req)
const likePost = async (req, res) => {
    const blog_id = req.params.id;
    try {
        // console.log(req.user);
        const blog = await POST.findById(blog_id);
        const arr= blog.likes;
        await arr.includes(req.user.id.toString()) ? arr.splice(arr.indexOf(req.user.id.toString()),1) : arr.push(req.user.id.toString());
        blog.likes = arr;
        await blog.save();
        res.status(200).redirect(`/job-post/${blog_id}`);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Sever error" });
    }
}

module.exports = {
    postComment,
    likePost
};