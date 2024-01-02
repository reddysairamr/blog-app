import express from "express" ;
import { v4 as uuidv4 } from 'uuid';
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000 ;

var blogPosts = [] ; //blogPosts is an array of blog objects
var blog = null ; //placeholder object ot hold a blog object

const app = express() ;
app.use(bodyParser.urlencoded({extended : true})) ;

app.get("/", (req, res) => {
    res.render("index.ejs", {blogs: blogPosts}) ;
}) ;

app.get("/create-blog", (req, res) => {
    res.sendFile(__dirname + "/public/create-blog.html");
}) ;

app.post("/create-blog-post", (req, res) => {
    const blogData = req.body ;
    blogPosts.push({
        id : uuidv4() ,
        title : blogData['title'], 
        body  : blogData['body'] 
    });
    //console.log(blogPosts) ;
    res.redirect("/");
}) ;

app.get("/open-blog/:id", (req, res) => {
    var blogData = null ;
    const id = req.params.id;
    for (let i = 0 ; i < blogPosts.length ; i ++){
        if (blogPosts[i].id === id){
            blogData = blogPosts[i] ;
            break ;
        }
    }

    res.render("blog.ejs", {
        id : blogData.id ,
        title : blogData.title ,
        body : blogData.body 
    }) ;
}) ;

app.get("/update-blog/:id", (req, res) => {
    var blogData = null ;
    const id = req.params.id;
    for (let i = 0 ; i < blogPosts.length ; i ++){
        if (blogPosts[i].id === id){
            blogData = blogPosts[i] ;
            break ;
        }
    }

    res.render("update-blog.ejs", {
        id : blogData.id ,
        title : blogData.title ,
        body : blogData.body 
    }) ;

})

app.post("/update-blog-post/:id", (req, res) => {
    const id = req.params.id ;
    const newBlog = req.body ;
    console.log(newBlog) ;
   
    for(let i = 0 ; i < blogPosts.length ; i ++){
        if(blogPosts[i].id === id){
            blogPosts[i].title = newBlog.title ;
            blogPosts[i].body = newBlog.body ; 
            break ;
        }
    }
    
    res.redirect("/") ;
});

app.get("/delete-blog/:id", (req, res) => {
    const id = req.params.id ;
    var index = null ;
    for(let i = 0 ; i < blogPosts.length ; i ++){
        if (blogPosts[i].id === id){
            index = i ;
            break ;
        }
    } 
    blogPosts.splice(index, 1) ;
    console.log(blogPosts);
    res.render("index.ejs", {blogs: blogPosts}) ;
}) ;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`) ;
}) ;