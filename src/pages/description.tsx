import React, { useEffect, useState } from "react";
import Loader from "../common/loader/loader";
import Blog from "../common/blog/blog";

const Description = (props: any) => {
  const [blog, setBlog] = useState();
  const url = "https://content.googleapis.com/blogger/v3/blogs/15045980/posts/";
  const key = "AIzaSyCnz169tp7MAkt0ef4AF4Xc_mBNFpU-aas";

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
  }, []);

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
