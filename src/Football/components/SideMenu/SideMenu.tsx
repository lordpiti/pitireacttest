import React, { FunctionComponent } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles, Theme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import './SideMenu.scss';

export interface MenuItemSideMenu {
  name: string;
  url: string;
}

interface SideMenuProps {
  itemList: MenuItemSideMenu[];
}

const styles = (theme: Theme) => ({
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

const ListItemComposition: FunctionComponent<SideMenuProps> = (props) => {
  const { itemList } = props;

  return (
    <div>
      {props.children}
      <Paper>
        <MenuList>
          {itemList.map((item, index) => (
            <NavLink
              key={index}
              to={{
                pathname: item.url,
              }}
            >
              <MenuItem>{item.name}</MenuItem>
            </NavLink>
          ))}
          {/* {itemList.map((item, index) => 
        <MenuItemLink key={index} to={item.url}>
            {item.name}
        </MenuItemLink>
        )} */}
        </MenuList>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ListItemComposition);
