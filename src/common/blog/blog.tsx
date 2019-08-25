import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import { Chip } from "@material-ui/core";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Blog = (props: any) => {
  const useStyles = makeStyles({
    card: {
      marginBottom: "24px"
    },
    cardAction :{
      cursor:"auto"
    },
    author: {
      textAlign:"right",
      color: "gray",
      fontSize: 15,
      paddingRight:10,
      fontStyle:"italic",
      marginLeft:"auto",
      textTransform:"capitalize"
    },
    chips:{
      marginRight :"5px",
      cursor:"pointer"
    },
    date: {
      fontSize: 15
    },
    content: {
      marginTop: 15,
      maxHeight: props.page !== "description" ? 150 : "inherit",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  });
  const classes = useStyles();
  const blog = props.item;
  const dateToFormat = blog.published;

  const findLabel = (labels:any) =>{
    if(labels.length > 1){
      for(let x in labels){
        if(labels[x] !== "GTAC"){
          return labels[x]
        }
      }
    }
    return labels[0]
  }

  const handleCategoryClick = (label:string) =>{
    props.history.push("/category/" + label)
  }

  const label:string = props.page === "description" ? findLabel(blog.labels) : blog.label;

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardAction}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {blog.title}
          </Typography>
          <Typography gutterBottom className={classes.date} variant="subtitle1" component="h3">
          <Chip color="primary" onClick={(e)=>handleCategoryClick(label)} className={classes.chips} label={label}></Chip> <Chip className={classes.chips} label={<Moment format="LL" date={dateToFormat}/>}></Chip> 
          </Typography>
          <Typography gutterBottom className={classes.date} variant="subtitle1" component="h3" />
          <Link className="default-text" to={"/blog/" + blog.id}>
          <Typography className={classes.content} variant="body2" color="textSecondary" component="div">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
      
      <CardActions>
        <Button size="small" color="primary" onClick={()=>props.deleteBlog(blog.id)}>
          Delete
        </Button>
        <Typography gutterBottom className={classes.author} variant="subtitle1" component="h3">
          - {blog.author.displayName}
          </Typography>
      </CardActions>
    </Card>
  );
}

export default withRouter(Blog)