import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router";
import Blog from "../common/blog/blog";
import Pagination from "material-ui-flat-pagination";
import Loader from "../common/loader/loader";
import Dropdown from "../common/dropdown/dropdown";
import { Grid, Icon, Fab } from "@material-ui/core";
import Category from "../common/blog/category"
import { blogContext } from "../common/context/blogcontext";
import { Link } from "react-router-dom";

const Listing = (props: any) => {
  const [state, setState] = useState();
  const [offset, setOffset] = useState(0);
  const [categories, setCategories]: any[] = useState([]);

  const category: string = window.location.pathname.indexOf("category") > 0 ? window.location.pathname.replace("/category/", "") : "";
  let urlParams = new URLSearchParams(window.location.search);
  const search: any = urlParams.has('search') ? urlParams.get('search') : "";
  const newblog = props.newblog

  const blogApi = useContext(blogContext);
  const url = blogApi.apiUrl + "?labels=GTAC&fetchBodies=true&fetchImages=true&maxResults=500&orderBy=published&key=" + blogApi.key;
  let setPropsCategories = props.setCategories

  useEffect(() => {
    const tempCategories: any[] = []
    setState({ data: [] })
    fetch(url).then(response => { return response.json(); })
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
        newItem.push(...newblog.map((blog: any, index: any) => {
          tempCategories.push(blog.labels[0])
          return { ...blog, label: blog.labels[0] }
        }))
        setCategories(Array.from(new Set(tempCategories)))
        setPropsCategories(Array.from(new Set(tempCategories)));
        if (category || search) {
          let value = category ? category : search
          let property = category ? "labels" : "title"
          setData(value, property, newItem)
        }
        else {
          setState({ data: [...newItem.reverse()] })
        }
      })
      .catch(err => {
        console.log("Fetch problem: " + err.message);
      });
  }, [category, search, setPropsCategories, url, newblog]);

  const setData = (value: string, property: string, newItem: any) => {
    let categorySorted = newItem.filter((blog: any) => {
      return blog[property].includes(decodeURIComponent(value))
    })
    setState({ data: categorySorted })
  }

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
      <Grid container direction="row" justify="space-between" alignItems="flex-start">
        <Grid item xs={6} md={6}>{category && <Category category={category}></Category>}</Grid>
        <Grid item xs={6} md={6}><Dropdown category={category} categories={categories} /></Grid>
      </Grid>
      {(state && state.data.length > 0 ? state.data.map((item: any, index: any) => {
        return (
          <React.Fragment key={index}>{
            (index < (offset + 20)) && (index >= offset) &&
            <Blog item={item} key={index} deleteBlog={deleteBlog} />}
          </React.Fragment>
        )
      }) : <Loader></Loader>)}
      <div className="pagination-controls">
        <Pagination limit={20} offset={offset} total={state ? state.data.length : 0} onClick={(e, offset) => handleClick(offset)} />
      </div>
      <Link to="/add-blog" className="default-text">
        <Fab aria-label="add-blog" className="add-blog" color="primary">
          <Icon>add</Icon>
        </Fab></Link>
    </div>
  );
};

export default withRouter(Listing);
