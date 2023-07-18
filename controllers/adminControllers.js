require('dotenv').config()
const POST = require("../models/PostModel");
const { postThumbnail, adminDetails, followerList, followingList } = require('../api/preview');


// @routes = "/admin/jobpostform"
// @desc = Post req for companies to post blogs 
const adminJobForm = async (req, res) => {
    const { jobTitle, titleDesc, skills, duration, stipend } = req.body;
    // Function to check for company
    const company_id = req.user.id;
    const admin = await adminDetails(company_id.toString());
    try {
        const form = new POST({
            user_id: req.user.id,
            jobTitle: jobTitle,
            jobDesc: titleDesc,
            skills: skills,
            duration: duration,
            stipend: stipend
        });
        await form.save();
        admin.posts.push(form);
        await admin.save();

        res.status(200).redirect('/admin');
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Sever error" });
    }

}
// @routes = "/admin"
// @desc = Get req for companies to view their blogs on Dashboard.ejs
const dashBoardPreviw = async (req, res) => {
    const { id } = req.user;
    const admin = await adminDetails(id.toString());
    const postArr = await postThumbnail(id.toString());
    let followerArr, followingArr;
    followerArr = await followerList(id);
    followingArr = await followingList(id);
    // console.log(admin);

    const personelData = { name: admin.username, email: admin.email, id: admin._id,picture: admin.picture };
    res.status(200).
    render("DashBoard", { personelData, arr: postArr,followerArr,followingArr });
}

// @routes = "/admin/preview/:id"
// @desc = Get req for companies to view their blogs in preview.ejs
const previewUser = async (req, res) => {
    const ID = req.params.id.toString();
    const userDes = await adminDetails(ID);
    const postArr = await postThumbnail(ID);
    if (ID === req.user.id) {
        res.status(200)
            .redirect('/admin');
    } else {
        let followerArr, followingArr;
        res.locals.isFollower = false;
        if (req.user) { // if logged in user follows preview user
            const existingUser = await adminDetails(req.user.id);
            if (existingUser.following.includes(ID)) {
                res.locals.isFollower = true;
            }
            followerArr = await followerList(ID);
            followingArr = await followingList(ID);
        }
        res.status(200).render("userPreview", { userDes, arr: postArr, followerArr, followingArr });
    }
}
// @routes = "/admin/delete/:id"
// @desc = Delete req for companies to delete jobs
const deleteBlog = async (req, res) => {
    const blog_id = req.params.id.toString();

    const post = await POST.findById(blog_id);
    if (post.user_id.toString() !== req.user.id.toString())
        res.status(403).json({ msg: "Unauthorized access" });
    const c = await POST.findByIdAndDelete(blog_id);
    if (!c)
        res.status(500).json({ msg: `server error // @routes = "/admin/delete/:id" ` });
    res.status(200).redirect('/admin');
}

module.exports = {
    adminJobForm,
    dashBoardPreviw,
    deleteBlog,
    previewUser
}