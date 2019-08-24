import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import Blog from "../common/blog/blog";
import Pagination from "material-ui-flat-pagination";

const Listing = (props: any) => {
  const [state, setState] = useState();
  const [offset,setOffset] = useState(0);
  const [page,setPage] = useState(0);
  const url =
    "https://content.googleapis.com/blogger/v3/blogs/15045980/posts?fetchBodies=true&fetchImages=true&maxResults=500&orderBy=published&key=AIzaSyCnz169tp7MAkt0ef4AF4Xc_mBNFpU-aas";
  useEffect(() => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(response => {
        let blogs = response.items;
        blogs.map((blog:any,index:string)=>{
          console.log(blog.title)
        })
        setState({data:blogs})
      })
      .catch(err => {
        console.log("Fetch problem: " + err.message);
      });
  }, []);

  const deleteBlog = (id:string) =>{
    var index = state.data.indexOf(state.data.find((item:any) => item.id === id))
    let tempArr = state.data;
    tempArr.splice(index,1);
    setState({data:tempArr})
    console.log(tempArr)
  }

  const handleClick = (offset:number) => {
    setOffset(offset);
  }


  return (
    <div className="listing-page">
      {(state && state.data && state.data.map((item:object,index:any)=>{
        return(
          <React.Fragment>{
            (index < (offset + 20)) && (index > offset) &&
          <Blog item={item} key={index} deleteBlog={deleteBlog}/>}
          </React.Fragment>
        )
      }) )}
      <div className="pagination-controls">
       <Pagination
          limit={20}
          offset={offset}
          total={state ? state.data.length : 0}
          onClick={(e, offset) => handleClick(offset)}
        />
        </div>
    </div>
  );
};

export default withRouter(Listing);
