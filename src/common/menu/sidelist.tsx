import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";

const sideList = (props: any) => (
  <div
    className={props.classes.list}
    role="presentation"
    onClick={props.toggleDrawer(props.side, false)}
    onKeyDown={props.toggleDrawer(props.side, false)}>
    <List>
      <Link to="/" className="default-text">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
      </Link>
    </List>
    <Divider />
    <Divider />
    <List>
      <a className="default-text" href={"https://github.com/freight-hub/freighthub-frontend-challenge/blob/master/README.md#use-cases"}>
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={"About"} />
        </ListItem>
      </a>
    </List>
  </div>
);

export default sideList;
