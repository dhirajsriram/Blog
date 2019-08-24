import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    marginBottom: "24px",
  },
  author:{
    color:"gray",
    fontSize:15
  },
  content:{
      marginTop:20,
      maxHeight:150,
      whiteSpace:"nowrap",
      overflow:"hidden",
      textOverflow:"ellipsis"
  }
});

export default function Blog(props: any) {
  const classes = useStyles();
  const blog = props.item
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {blog.title}
          </Typography>
          <Typography gutterBottom className={classes.author} variant="subtitle1" component="h3">
            {blog.author.displayName}
          </Typography>
          <Typography className={classes.content} variant="body2" color="textSecondary" component="div">
            <div dangerouslySetInnerHTML={{__html:blog.content}}></div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
