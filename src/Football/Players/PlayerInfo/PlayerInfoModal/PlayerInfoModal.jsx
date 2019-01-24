import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import BasicDropzone from '../../../components/BasicDropzone/BasicDropzone';
import FormValidator from '../../../utilities/FormValidator';
import { TextField, FormControl, InputLabel, MenuItem, FormHelperText, Select, Grid } from '@material-ui/core';


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
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Name is required'
      },
      {
        field: 'surname',
        method: 'isEmpty',
        validWhen: false,
        message: 'Surname is required'
      }
    ]);

		this.state = { ...this.state,
			playerData: props.playerData,
			validation: this.validator.valid(),
			currentImage: null
		};
    
    this.submitted = false;
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
			playerData: {
				...this.state.playerData,
				[event.target.name]: event.target.value
			}		
		});
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state.playerData);
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
      this.props.savePlayer(image, this.state.playerData);
      this.handleClose();
    }
  }

  render() {
    const { classes } = this.props;

    let validation = this.submitted ?         // if the form has been submitted at least once
      this.validator.validate(this.state.playerData) :   // then check validity every time we render
      this.state.validation                   // otherwise just use what's in state

    const positions = [
      'Goalkeeper',
      'Defender',
      'Midfielder',
      'Striker'
    ];
    
    if (!this.props.playerData) {
      return <div></div>
    } else 
    return (
      <div>
        <Button onClick={this.handleOpen}>Edit player info</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <h1>Player Basic Info</h1>
            <div className="row">
              <div className="col-sm-9">
                <form>
                  <div className={validation.name.isInvalid && 'has-error'}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control"
                      name="name"
                      placeholder="player name"
                      onChange={this.handleInputChange}
                      value={this.state.playerData.name}
                    />
                    <span className="help-block">{validation.name.message}</span>
                  </div>
    
                  <div className={validation.surname.isInvalid && 'has-error'}>
                    <label htmlFor="surname">Surname</label>
                    <input type="text" className="form-control"
                      name="surname"
                      placeholder="player surname"
                      onChange={this.handleInputChange}
                      value={this.state.playerData.surname}
                    />
                    <span className="help-block">{validation.surname.message}</span>
                  </div>
<div>
                  <TextField
                    id="birthDate"
                    name="birthDate"
                    label="Date of birth"
                    type="date"
                    defaultValue={this.state.playerData.birthDate}
                    onChange={this.handleInputChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
</div>
                  {/* <MuiPickersUtilsProvider  utils={MomentUtils}>
                    <Grid container className={classes.grid} justify="space-around">
                      <DatePicker
                        margin="normal"
                        name="birthDate"
                        label="Date picker"
                        value={this.state.playerData.birthDate}
                        onChange={this.handleInputChange}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider> */}
                  <FormControl required className={classes.formControl}>
                    <InputLabel htmlFor="position">Position</InputLabel>
                    <Select
                      value={this.state.playerData.position}
                      onChange={this.handleInputChange}
                      name="position"
                      inputProps={{
                        id: 'position-required',
                      }}
                      className={classes.selectEmpty}
                    >
                    {positions.map(position => 
                      (<MenuItem value={position}>{position}</MenuItem>)
                    )}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                </form>
              </div>
              <div className="col-sm-3">
                <img src={this.props.playerData.picture.url} height="100" width="100" />
                <BasicDropzone settings={this.dropzoneSettings} />
              </div>
            </div>
            <div className="text-right margin-top-medium">
              <Button variant="contained" color="primary" className={classes.button} onClick={this.handleFormSubmit}>
                Save
              </Button>           
            </div>
          </div>        
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleModal);