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
import { Link } from "react-router-dom";

export default function Blog(props: any) {
  const useStyles = makeStyles({
    card: {
      marginBottom: "24px"
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

  const label = props.page === "description" ? findLabel(blog.labels) : blog.label;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {blog.title}
          </Typography>
          <Typography gutterBottom className={classes.date} variant="subtitle1" component="h3">
          <Link className="default-text" to={"/category/" + label}><Chip color="primary" className={classes.chips} label={props.page === "description" ? findLabel(blog.labels) : blog.label}></Chip> </Link><Chip className={classes.chips} label={<Moment format="LL" date={dateToFormat}/>}></Chip> 
          </Typography>
          <Typography gutterBottom className={classes.date} variant="subtitle1" component="h3" />
          <Typography className={classes.content} variant="body2" color="textSecondary" component="div">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </Typography>
          
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
