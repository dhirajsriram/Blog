import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  createStyles,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      padding:8
    },
    logo:{
      width:"90%",
      verticalAlign:"top",
      display:"block",
      margin:"auto",
      '&:hover': {
        transition: "width 0.25s",
        width:"100%"
      }
    },
    drawerPaper: {
      width: drawerWidth
    }
  })
);

export default function Sidelist(props: any){
  const classes = useStyles();
  return(
  <div>
    <div className={classes.toolbar} >
      <Link to="/" className="default-text"> <img alt="logo" src={require("../../assets/logo.png")} className={classes.logo}/></Link>
    </div>
    {props.categoryArr && props.categoryArr.length > 0 && <Divider />}
    <List>
      {props.categoryArr && props.categoryArr.map((category:string, index:any) => (
        <Link key={index} className="default-text" to={"/category/" + category}>
        <ListItem button>
          <ListItemIcon><Icon>person</Icon></ListItemIcon>
          <ListItemText primary={category} />
        </ListItem>
        </Link>
      ))}
    </List>
    <Divider />
    <List>
    <a className="default-text" href="https://developers.google.com/blogger/">
        <ListItem button>
          <ListItemIcon><Icon>view_quilt</Icon></ListItemIcon>
          <ListItemText primary="Blogger" />
        </ListItem>
        </a>
    <a className="default-text" href="https://github.com/dhirajsriram/Blog">
        <ListItem button>
          <ListItemIcon><Icon>info</Icon></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
    </a>
    </List>
  </div>)
}

