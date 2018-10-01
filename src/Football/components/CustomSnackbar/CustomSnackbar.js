import React, { Component } from "react";
import * as globalActionCreators from '../../store/actions/global';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class CustomSnackbar extends Component {

  handleClose = () => {
    this.props.hideToaster();
  };

  render() {

    const { classes } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            UNDO
                </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    open: state.global.dash.open,
    message: state.global.dash.message
  }
};

const mapDispatchToProps = dispatch => {
  return {
    hideToaster: () => dispatch(globalActionCreators.acToastDashClear())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomSnackbar));