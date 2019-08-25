import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import Blog from "../common/blog/blog";
import Pagination from "material-ui-flat-pagination";
import { Link } from "react-router-dom";
import Loader from "../common/loader/loader";
import Dropdown from "../common/dropdown/dropdown";
import { Grid } from "@material-ui/core";
import Category from "../common/blog/category"

const Listing = (props: any) => {
  const [state, setState] = useState();
  const [offset, setOffset] = useState(0);
  const [categories, setCategories]: any[] = useState([]);
  const category: string = window.location.pathname.indexOf("category") > 0 ? window.location.pathname.replace("/category/", "") : ""
  const url =
    "https://content.googleapis.com/blogger/v3/blogs/15045980/posts?labels=GTAC&fetchBodies=true&fetchImages=true&maxResults=500&orderBy=published&key=AIzaSyCnz169tp7MAkt0ef4AF4Xc_mBNFpU-aas";
  useEffect(() => {
    const tempCategories: any[] = []
    setState({ data: [] })
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(response => {
        let blogs = response.items;
        let newItem = blogs.map((blog: any, index: any) => {
          if (blog.labels.length > 1) {
            for (let x in blog.labels) {
              if (blog.labels[x] !== "GTAC") {
                tempCategories.push(blog.labels[x])
                return { ...blog, label: blog.labels[x] }
              }
            }
          }
          tempCategories.push(blog.labels[0])
          return { ...blog, label: blog.labels[0] }
        })
        setCategories(Array.from(new Set(tempCategories)))
        if (category !== "") {
          let categorySorted = newItem.filter((blog: any) => {
            return blog.labels.includes(decodeURIComponent(category))
          })
          setState({ data: categorySorted })
        } else {
          setState({ data: newItem })
        }
      })
      .catch(err => {
        console.log("Fetch problem: " + err.message);
      });
  }, [category]);

  const deleteBlog = (id: string) => {
    var index = state.data.indexOf(state.data.find((item: any) => item.id === id))
    let tempArr = state.data;
    tempArr.splice(index, 1);
    setState({ data: tempArr })
  }

  const handleClick = (offset: number) => {
    setOffset(offset);
  }

  return (
    <div className="listing-page">
      <Grid container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={6} md={6}>{category && <Category category={category}></Category>}</Grid>
        <Grid item xs={6} md={6}><Dropdown category={category} categories={categories} /></Grid>
      </Grid>

      {(state && state.data.length > 0 ? state.data.map((item: any, index: any) => {
        return (
          <Link className="default-text" to={"/blog/" + item.id} key={index}>{
            (index < (offset + 20)) && (index >= offset) &&
            <Blog item={item} key={index} deleteBlog={deleteBlog} />}
          </Link>
        )
      }) : <Loader></Loader>)}
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
