//Just another version of this HOC, creating a wrapper and using children props

import React, { ReactNode } from 'react';

interface RoleVisibleWrapper {
  roles: string[];
  children: ReactNode; //maybe leave it as any
}

const roleVisibleWrapper = (props: RoleVisibleWrapper) => {
  let content = null;

  if (props.roles.some((role) => role === localStorage.role_react)) {
    content = props.children;
  }

  return <>{content}</>;
};

export default roleVisibleWrapper;
