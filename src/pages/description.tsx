import React, { useEffect, useState, useContext } from "react";
import Loader from "../common/loader/loader";
import Blog from "../common/blog/blog";
import { blogContext } from "../common/context/blogcontext";
import Errorhandler from "./errorHandler";

const Description = (props: any) => {
  const [blog, setBlog] = useState();
  const [error , setError] = useState(false)
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
        setError(true)
      });
    }
  }, [key, url,blogId,newblog]);

  return (
    <React.Fragment>
      {!error ? <div className="blog-details">
        {blog && blog.id ? (
          <Blog item={blog} page="description" />
        ) : (
            <Loader />
          )}
      </div> : <Errorhandler dataError={true}></Errorhandler>}
    </React.Fragment>
  );
};

export default Description;
