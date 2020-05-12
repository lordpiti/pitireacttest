import React from 'react';

const RoleVisibleComponent = ({
  component: Component,
  roles,
  ...props
}: any) => {
  let content = null;

  if (roles.some((role: any) => role === localStorage.role_react)) {
    content = <Component {...props} />;
  }

  return content;
};

export default RoleVisibleComponent;
