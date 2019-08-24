import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import Blog from "../common/blog/blog";

const Listing = (props: any) => {
  const [state, setState] = useState();
  const url =
    "https://content.googleapis.com/blogger/v3/blogs/3213900/posts?fetchBodies=true&fetchImages=true&maxResults=40&orderBy=published&key=AIzaSyCnz169tp7MAkt0ef4AF4Xc_mBNFpU-aas";
  useEffect(() => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        let blogs = json;
        setState({ data: blogs });
      })
      .catch(err => {
        console.log("Fetch problem: " + err.message);
      });
  }, []);

  return (
    <div className="listing-page">
      {(state && state.data && state.data.items.map((item:object,index:string)=>{
        return(
          <Blog item={item} key={index}/>
        )
      }) )}
    </div>
  );
};

export default withRouter(Listing);
