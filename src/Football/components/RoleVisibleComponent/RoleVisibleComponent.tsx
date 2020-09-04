import React from 'react';

// https://stackoverflow.com/questions/34810910/set-required-attributes-in-typescript
interface RoleVisibleComponentProps {
  roles: string[];
  component: any;
  [key: string]: any;
}

const RoleVisibleComponent = ({
  component: Component,
  roles,
  ...props
}: RoleVisibleComponentProps) => {
  let content = null;

  if (roles.some((role: string) => role === localStorage.role_react)) {
    content = <Component {...props} />;
  }

  return content;
};

export default RoleVisibleComponent;

// interface RoleVisibleComponentProps {
//   roles: string[];
// }

// const RoleVisibleComponent = <P extends object>(
//   Component: React.ComponentType<P>
// ): React.FC<P & RoleVisibleComponentProps> => ({
//   roles,
//   ...props
// }: RoleVisibleComponentProps) => {
//   let content = null;

//   if (roles.some((role: string) => role === localStorage.role_react)) {
//     content = <Component {...(props as P)} />;
//   }

//   return content;
// };

// export default RoleVisibleComponent;
