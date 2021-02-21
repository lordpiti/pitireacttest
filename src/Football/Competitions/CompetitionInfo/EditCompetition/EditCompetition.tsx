import React from 'react';
import Button from '@material-ui/core/Button';
import { TextField, FormHelperText, WithStyles } from '@material-ui/core';
import editModal from '../../../components/EditModal/editModal';
import BasicDropzone from '../../../components/BasicDropzone/BasicDropzone';
import FormValidator from '../../../utilities/FormValidator';

interface EditCompetitionProps extends WithStyles {
  competitionData: any;
  saveCompetition: Function;
  handleClose: Function;
}

interface EditCompetitionState {
  competitionData: any;
  validation: any;
  currentImage: any;
}

class EditCompetitionInfo extends React.Component<
  EditCompetitionProps,
  EditCompetitionState
> {
  validator: FormValidator;
  submitted: boolean;

  constructor(props: EditCompetitionProps) {
    super(props);

    const validRegEx = (range: string) => /^\d{4}(-\d{4})$/.test(range);

    this.validator = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Name is required',
      },
      {
        field: 'season',
        method: validRegEx,
        validWhen: true,
        message: 'Season is required and need to have the right format',
      },
    ]);

    this.state = {
      ...this.state,
      competitionData: props.competitionData,
      validation: this.validator.valid(),
      currentImage: null,
    };

    this.submitted = false;
  }

  callbackDropzone = (files: File[]) => {
    let fileToUpload = null;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // do whatever you want with the file content
        fileToUpload = reader.result;
        this.setState({
          currentImage: {
            data: fileToUpload,
            fileName: file.name,
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
    isImage: true,
  };

  handleInputChange = (event: any) => {
    event.preventDefault();

    this.setState({
      competitionData: {
        ...this.state.competitionData,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleFormSubmit = (event: any) => {
    event.preventDefault();
    const validation = this.validator.validate(this.state.competitionData);
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
      this.props.saveCompetition(image, this.state.competitionData);
      this.props.handleClose();
    }
  };

  render() {
    const { classes } = this.props;

    let validation = this.submitted // if the form has been submitted at least once
      ? this.validator.validate(this.state.competitionData) // then check validity every time we render
      : this.state.validation; // otherwise just use what's in state

    if (!this.props.competitionData) {
      return <div></div>;
    } else
      return (
        <div>
          <h1>Competition Basic Info</h1>
          <div className='row'>
            <div className='col-sm-7'>
              <form>
                <TextField
                  required
                  error={
                    validation.name.message != undefined &&
                    validation.name.message != ''
                  }
                  id='name'
                  name='name'
                  label='Competition name'
                  defaultValue={this.state.competitionData.name}
                  className={classes.textField}
                  margin='normal'
                  onChange={this.handleInputChange}
                />
                <FormHelperText>Required</FormHelperText>
                <TextField
                  required
                  error={
                    validation.season.message != undefined &&
                    validation.season.message != ''
                  }
                  id='season'
                  name='season'
                  label='Season'
                  defaultValue={this.state.competitionData.season}
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
                src={this.props.competitionData.logo.url}
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

export default editModal(EditCompetitionInfo);
