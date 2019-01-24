import React from 'react';


const RoleVisibleComponent = ({ component: Component, roles, ...props }) => {

  let content = null;

  if (roles.some(role => role === localStorage.role_react)) {
    content = <Component { ...props } />
  }

  return content;
}

export default RoleVisibleComponent;