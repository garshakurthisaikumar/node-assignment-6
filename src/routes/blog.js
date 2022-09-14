const router = require('express').Router();
const Blog = require('../models/Blog');



// Your routing code goes here

////////////  fetching the data
router.get('/blog',async (req,res)=>{
    try {
        const pages = Number(req.query.page);
        const entry = req.query.search;
        console.log(pages,entry);
        if (pages <= 0 || "") {
          return res.json({
            status: "something error",
            message: "number is not valid",
          });
        }

     const userdata = await Blog.find({topic:entry});
       console.log(userdata)
        const size = userdata.length;
        if (size == 0) {
          return res.json({
            status: "something wrong ",
            message: "size is zero",
          });
        }
        let countofpages = Math.ceil(size/5);
        if (pages > countofpages) {
          return res.json({
            status: "error",
            message: "pages should be less than count of pages",
          });
        }
        const finalblog = await Blog.find({topic:entry}).skip((pages-1)*5).limit(5);
        res.json({
          status: "success",
          result: finalblog,
        });
      } catch (e) {
        res.json({
          status: "something error",
          message: e.message,
        });
      }
    });
////////////  creating the data
router.post("/blog", async (req, res) => {
    try {
      const data = req.body;
      const userdata = await Blog.create(data);
      res.json({
        status: "success",
        result: userdata,
      });
    } catch (e) {
      res.json({
        status: "something error",
        message: e.message,
      });
    }
  });
////////// updating the data
router.put("/blog/:id", async (req, res) => {
    try {
      let data = req.body;
      const userdata = await Blog.updateOne({ _id: req.params.id }, data);
      res.json({
        status: "success",
        result: userdata,
      });
    } catch (e) {
      res.json({
        status: "something error",
        message: e.message,
      });
    }
  });
////////////// deleting the data
router.delete("/blog/:id", async (req, res) => {
    try {
      const userdata = await Blog.deleteOne({ _id:req.params.id});
      res.json({
        status: "success",
        result: userdata,
      });
    } catch (e) {
      res.json({
        status: "something error",
        message: e.message,
      });
    }
  });
  

module.exports = router;