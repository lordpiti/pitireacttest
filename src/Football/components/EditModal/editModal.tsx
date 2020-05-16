import React, { Component, ComponentType } from 'react';
import {
  Button,
  Modal,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core';

const getModalStyle = () => {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
};

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
    },
  });

interface EditModalState {
  open: boolean;
}

//https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
const withModal = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const modalWrapper = class ModalWrapper extends Component<
    P & WithStyles,
    EditModalState
  > {
    state = {
      open: false,
    };

    handleOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    render() {
      const { classes } = this.props;

      return (
        <div>
          <Button onClick={this.handleOpen}>EDIT</Button>
          <Modal
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <WrappedComponent
                {...this.props}
                handleClose={this.handleClose}
              ></WrappedComponent>
            </div>
          </Modal>
        </div>
      );
    }
  };

  return withStyles(styles)(modalWrapper as any);
};

export default withModal;
