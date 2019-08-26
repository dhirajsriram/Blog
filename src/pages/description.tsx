import React, { useEffect, useState, useContext } from "react";
import Loader from "../common/loader/loader";
import Blog from "../common/blog/blog";
import { blogContext } from "../common/context/blogcontext";

const Description = (props: any) => {
  const [blog, setBlog] = useState();
  const blogApi = useContext(blogContext);
  const url = blogApi.apiUrl;
  const key = blogApi.key;

  useEffect(() => {
    fetch(url + window.location.pathname.replace("/blog/", "") + "?key=" + key)
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
  }, [key, url]);

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
