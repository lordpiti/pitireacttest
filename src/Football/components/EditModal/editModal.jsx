import React, { Component } from 'react';
import { Button, Modal, withStyles } from '@material-ui/core';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const withModal = (WrappedComponent) => {
	const modalWrapper = class ModalWrapper extends Component {

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

			return (<div>
				<Button onClick={this.handleOpen}>EDIT</Button>
				<Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
							<WrappedComponent {...this.props} handleClose={this.handleClose}></WrappedComponent>
						</div>
				</Modal>
			</div>)
		}

	}

	return withStyles(styles)(modalWrapper);
}

export default withModal;