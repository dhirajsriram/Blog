import React, { useEffect, useState, useContext } from "react";
import Loader from "../common/loader/loader";
import Blog from "../common/blog/blog";
import { blogContext } from "../common/context/blogcontext";

const Description = (props: any) => {
  const [blog, setBlog] = useState();
  const blogApi = useContext(blogContext);
  const url = blogApi.apiUrl;
  const key = blogApi.key;
  const blogId = window.location.pathname.replace("/blog/", "")
  const newblog = props.newblog
  useEffect(() => {
    let staticblog = newblog.find((blog:any)=>{
      return blog.id === blogId
    })
    if(staticblog){
      setBlog(staticblog)
    }
    
    else{
    fetch(url + blogId + "?key=" + key)
      .then(response => {
        return response.json();
      })
      .then(response => {
        let blog = response;
        setBlog(blog)
      })
      .catch(err => {
        console.log("Fetch problem: " + err.message);
      });
    }
  }, [key, url,blogId,newblog]);

  return (
    <React.Fragment>
      <div className="blog-details">
        {blog && blog.id ? (
          <Blog item={blog} page="description" />
        ) : (
            <Loader />
          )}
      </div>
    </React.Fragment>
  );
};

export default Description;
