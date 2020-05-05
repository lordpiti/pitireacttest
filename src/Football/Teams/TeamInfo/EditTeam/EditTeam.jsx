import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { TextField, FormHelperText } from '@material-ui/core';
import editModal from '../../../components/EditModal/editModal';
import BasicDropzone from '../../../components/BasicDropzone/BasicDropzone';
import FormValidator from '../../../utilities/FormValidator';

class EditTeamInfo extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Name is required',
      },
    ]);

    this.state = {
      ...this.state,
      teamData: props.teamData,
      validation: this.validator.valid(),
      currentImage: null,
    };

    this.submitted = false;
  }

  callbackDropzone = (files) => {
    let fileToUpload = null;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // do whatever you want with the file content
        fileToUpload = reader.result;

        this.setState({
          currentImage: {
            data: fileToUpload,
            fileName: 'test.png',
          },
        });
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsDataURL(file);
    });
  };

  dropzoneSettings = {
    multipleFiles: false,
    callback: this.callbackDropzone,
  };

  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      teamData: {
        ...this.state.teamData,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const validation = this.validator.validate(this.state.teamData);
    this.setState({ validation });

    this.submitted = true;

    if (validation.isValid) {
      let image = null;

      if (this.state.currentImage) {
        image = {
          data: this.state.currentImage.data,
          fileName: this.state.currentImage.fileName,
        };
      }
      this.props.saveTeam(image, this.state.teamData);
      this.props.handleClose();
    }
  };

  render() {
    const { classes } = this.props;

    let validation = this.submitted // if the form has been submitted at least once
      ? this.validator.validate(this.state.teamData) // then check validity every time we render
      : this.state.validation; // otherwise just use what's in state

    if (!this.props.teamData) {
      return <div></div>;
    } else
      return (
        <div>
          <h1>Team Basic Info</h1>
          <div className='row'>
            <div className='col-sm-7'>
              <form>
                <TextField
                  required
                  error={validation.name.message}
                  id='name'
                  name='name'
                  label='Team name'
                  defaultValue={this.state.teamData.name}
                  className={classes.textField}
                  margin='normal'
                  onChange={this.handleInputChange}
                />
                <FormHelperText>Required</FormHelperText>
              </form>
            </div>
            <div className='col-sm-5 text-center'>
              <img
                className='roundedImage'
                src={this.props.teamData.pictureLogo.url}
                height='100'
                width='100'
              />
              <BasicDropzone settings={this.dropzoneSettings} />
            </div>
          </div>
          <div className='text-right margin-top-medium'>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={this.handleFormSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      );
  }
}

EditTeamInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default editModal(EditTeamInfo);
