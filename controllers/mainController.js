
const { searchAPI } = require("../api/searchAPI");
const POST  = require("../models/PostModel");
const commentModel = require("../models/commentModel");

// @routes = /
// @desc = Displays all jobs
const mainDisplay = async(req,res)=>{
    
    try {
        const jobs= await POST.find();
        if(!jobs){
            res.status(403)
            .json({ msg: "No jobs in DB" });
        }
        const searchPar = req.body.searchContent;
        if (typeof searchPar !="undefined" && searchPar !=null && searchPar.length !=0)
            res.locals.searchJSON= await searchAPI(searchPar);


        let val=true;
        if (req.cookies.authorization === undefined || req.cookies.authorization === null)
            val=false;

        res.status(200)
            .render('landingPage',{jobs,val});
    } catch (err) {
        console.log(err);  
        res.status(500).json({msg:"Server error"});      
    }
}

// @routes = /job-post/:id
// @desc = Displays specific job by id
const getJobById = async(req,res)=>{
    const blog_id = req.params.id;
    try {
        const job=await POST.findById(blog_id);
        if(!job)
            res.status(404).render('404');
        const commentArr=[];
        const arr=job.comments

        await Promise.all(arr.map(async(id) =>  {
            let data= await commentModel.findById(id.toString());
            let inval={comment:(data.comment.toString()),user:(data.user_id.toString())}
            
            commentArr.push(inval);
        }));
    
        res.status(200).render('jobPreview',{article:job,commentArr});

    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"Server error"});      
    }
}

const postComment = async (req,res)=>{
    const {comment} = req.body;
    const blog_id = req.params.id;

    try{        
        const newComment = new commentModel({
        comment: comment,
        user_id: req.user.id,
        blog_id:blog_id
        });
        await newComment.save();

        // saving in blog-post
        const blog=await POST.findById(blog_id);
        blog.comments.push(newComment);
        await blog.save();

        res.status(200).redirect(`/job-post/${blog_id}`);

    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"Sever error"});        
    }
    
}

module.exports={
    mainDisplay,
    getJobById,
    postComment
}