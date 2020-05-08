import React, { Component } from 'react';
import * as globalActionCreators from '../../store/actions/global';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FootballState, FootballDispatch } from '../../..';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  });

const styles1 = makeStyles((theme: Theme) =>
  createStyles({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

function MySnackbarContent(props: any) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = (variantIcon as any)[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

class CustomSnackbar extends Component<any, any> {
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
          <Button
            key='undo'
            color='secondary'
            size='small'
            onClick={this.handleClose}
          >
            UNDO
          </Button>,
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant={this.props.toasterType}
          message={this.props.message}
        />
      </Snackbar>
    );
  }
}

const MySnackbarContentWrapper = withStyles(styles1 as any)(MySnackbarContent);

const mapStateToProps = (state: FootballState) => {
  return {
    open: state.global.dash.open,
    message: state.global.dash.message,
    toasterType: state.global.dash.toasterType,
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    hideToaster: () => dispatch(globalActionCreators.acToastDashClear()),
  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomSnackbar));

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CustomSnackbar) as React.ElementType;
