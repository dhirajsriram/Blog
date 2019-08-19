import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Sidelist from "./sidelist"


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  menuItems: {
    textTransform:"capitalize",
    paddingLeft:24,
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const _toggleDrawer = (side:any, open:any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  return (
    <div>
      <IconButton
						onClick={_toggleDrawer('left', true)}
						edge="start"
						color="inherit"
						aria-label="Open drawer"
					>
						<MenuIcon />
					</IconButton>
      <Drawer open={state.left} onClose={_toggleDrawer('left', false)} >
      <Sidelist classes={classes} toggleDrawer={_toggleDrawer} side="left"></Sidelist>
      </Drawer>
    </div>
  );
}