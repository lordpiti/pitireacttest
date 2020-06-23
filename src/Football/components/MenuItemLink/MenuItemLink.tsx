import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Route } from 'react-router-dom';

const MenuItemLink = (props: any) => {
  const { to, also, ...rest } = props;

  return (
    <Route
      render={({ history, location }) => (
        <MenuItem
          onClick={() => {
            history.push(to);
            if (typeof also === 'function') {
              also();
            }
          }}
          {...rest}
        />
      )}
    />
  );
};
MenuItemLink.muiName = 'MenuItem';
export default MenuItemLink;
