import React from "react";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  createStyles,
  Typography,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      padding:16
    },
    heading:{
      fontWeight:"bold"
    },
    logo:{
      width:30,
      verticalAlign:"top",
      marginRight:24
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
      <Link to="/" className="default-text"> <img alt="logo" src={require("../../assets/logo.png")} className={classes.logo}/><Typography className={classes.heading} variant="h5" component="span">Blog</Typography></Link>
    </div>
    <Divider />
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {["All mail", "Trash", "Spam"].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>)
}

