
const { searchAPI } = require("../api/searchAPI");
const POST = require("../models/PostModel");
const commentModel = require("../models/commentModel");

// @routes = /
// @desc = Displays all jobs
// @return = jobs array to be displayed on landing page
const mainDisplay = async (req, res) => {

    try {
        
        const jobs = await POST.find();
        if (!jobs) {
            res.status(403)
                .json({ msg: "No jobs in DB" });
        }
        const searchPar = req.body.searchContent;
        if (typeof searchPar != "undefined" && searchPar != null && searchPar.length != 0)
            res.locals.searchJSON = await searchAPI(searchPar);


        let val = true;
        if ((req.cookies.authorization === undefined || req.cookies.authorization === null) && !(req.isAuthenticated()))
            val = false;

        res.status(200)
            .render('landingPage', { jobs, val });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error MAIN" });
    }
}

// @routes = /job-post/:id
// @desc = Displays specific job by id
// @return = jobPreview page
const getJobById = async (req, res) => {
    const blog_id = req.params.id;
    try {
        const job = await POST.findById(blog_id);
        if (!job)
            res.status(404).render('404');
        const commentArr = [];
        const arr = job.comments

        await Promise.all(arr.map(async (id) => {
            let data = await commentModel.findById(id.toString());
            let inval;
            if(data == 'undefined' || typeof data == 'undefined' || data == null || typeof data == null || data.length == 0){
                return;
            }else{
             inval = {
                comment: (data.comment.toString()),
                user_id: (data.user_id.toString()),
                username: (data.username.toString())
            };
        }
        commentArr.push(inval);
        }));

        res.status(200).render('jobPreview', { article: job, commentArr });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
}


module.exports = {
    mainDisplay,
    getJobById
}