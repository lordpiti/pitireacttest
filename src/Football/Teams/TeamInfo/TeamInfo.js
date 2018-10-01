import React, { Component } from 'react';
import BasicDropzone from '../../components/BasicDropzone/BasicDropzone';
import FormValidator from '../../utilities/FormValidator';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/teams';
import * as globalActionCreators from '../../store/actions/global';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class TeamInfo extends Component {

	constructor(props) {
		super(props);
		this.validator = new FormValidator([
			{
				field: 'name',
				method: 'isEmpty',
				validWhen: false,
				message: 'Name is required'
			}
		]);

		let newone = {
			validation: this.validator.valid(),
			currentImage: null
		};

		Object.assign(newone, props.teamData);
		this.state = newone;

		this.submitted = false;
	}

	callbackDropzone = (files) => {
		let fileToUpload = null;
		files.forEach(file => {
			const reader = new FileReader();
			reader.onload = () => {
				// do whatever you want with the file content
				fileToUpload = reader.result;

				this.setState({
					currentImage: {
						data: fileToUpload,
						fileName: 'test.png'
					}
				})
			};
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.readAsDataURL(file);
		});
	}

	dropzoneSettings = {
		multipleFiles: false,
		callback: this.callbackDropzone
	}

	handleInputChange = event => {
		event.preventDefault();

		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleFormSubmit = event => {
		event.preventDefault();

		const validation = this.validator.validate(this.state);
		this.setState({ validation });

		this.submitted = true;

		if (validation.isValid) {
			let image = null;

			if (this.state.currentImage) {
				image = {
					data: this.state.currentImage.data,
					fileName: this.state.currentImage.fileName
				};
			}
			this.props.saveTeam(image, this.state);
		}
	}

  handleClose = () => {
		this.props.hideToaster();
  };

	render() {

		const { classes } = this.props;

		let validation = this.submitted ?         // if the form has been submitted at least once
			this.validator.validate(this.state) :   // then check validity every time we render
			this.state.validation                   // otherwise just use what's in state

		return (
			<div>
				<h1>Team Basic Info</h1>
				<div className="row">
					<div className="col-sm-9">
						<form className="demoForm">
							<div className={validation.name.isInvalid && 'has-error'}>
								<label htmlFor="name">Name</label>
								<input type="text" className="form-control"
									name="name"
									placeholder="team name"
									onChange={this.handleInputChange}
									value={this.state.name}
								/>
								<span className="help-block">{validation.name.message}</span>
							</div>

							<button onClick={this.handleFormSubmit} className="btn btn-primary">
								Save
					</button>
						</form>
					</div>
					<div className="col-sm-3">
						<img src={this.props.teamData.pictureLogo.url} height="100" width="100" />
						<BasicDropzone settings={this.dropzoneSettings} />
					</div>
				</div>
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
			
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		currentTeam: state.teams.currentTeam,
		open: state.global.dash.open,
		message: state.global.dash.message
	}
};

const mapDispatchToProps = dispatch => {
	return {
		saveTeam: (image, teamData) => dispatch(actionCreators.saveTeam(image, teamData)),
		hideToaster: () => dispatch(globalActionCreators.acToastDashClear())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamInfo));
