import React, { Component } from 'react';

const asyncComponent = (importComponent: any) => {
  return class extends Component<any, any> {
    state = {
      component: null as any,
    };

    componentDidMount() {
      importComponent().then((cmp: any) => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
