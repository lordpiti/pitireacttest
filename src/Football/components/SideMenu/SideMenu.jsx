import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import './SideMenu.css';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

function ListItemComposition(props) {

  const { classes, itemList } = props;
    
  return (
    <div>
    {props.children}
    <Paper>
      <MenuList>
        {/* <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <SendIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Sent mail" />
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Drafts" />
        </MenuItem>*/}

        {itemList.map((item, index) => 
        
          <NavLink key={index} to={{
                pathname: item.url
            }}><MenuItem>{item.name}</MenuItem>
          </NavLink>
        
        )}
        {/* {itemList.map((item, index) => 
        <MenuItemLink key={index} to={item.url}>
            {item.name}
        </MenuItemLink>
        )} */}
      </MenuList>
      
    </Paper>
    </div>
  );
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);