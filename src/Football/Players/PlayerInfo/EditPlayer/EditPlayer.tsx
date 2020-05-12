import React from 'react';
import Button from '@material-ui/core/Button';
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import editModal from '../../../components/EditModal/editModal';
import BasicDropzone from '../../../components/BasicDropzone/BasicDropzone';
import FormValidator from '../../../utilities/FormValidator';

class EditPlayerInfo extends React.Component<any, any> {
  validator: FormValidator = {} as FormValidator;
  submitted: boolean;

  constructor(props: any) {
    super(props);
    this.validator = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Name is required',
      },
      {
        field: 'surname',
        method: 'isEmpty',
        validWhen: false,
        message: 'Surname is required',
      },
    ]);

    this.state = {
      ...this.state,
      playerData: props.playerData,
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
    isImage: true,
  };

  handleInputChange = (event: any) => {
    event.preventDefault();

    this.setState({
      playerData: {
        ...this.state.playerData,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleBirthDateChange = (newDate: any) => {
    this.setState({
      playerData: {
        ...this.state.playerData,
        birthDate: newDate,
      },
    });
  };

  handleFormSubmit = (event: any) => {
    event.preventDefault();
    const validation = this.validator.validate(this.state.playerData);
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
      this.props.savePlayer(image, this.state.playerData);
      this.props.handleClose();
    }
  };

  render() {
    const { classes } = this.props;

    let validation = this.submitted // if the form has been submitted at least once
      ? this.validator.validate(this.state.playerData) // then check validity every time we render
      : this.state.validation; // otherwise just use what's in state

    const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Striker'];

    if (!this.props.playerData) {
      return <div></div>;
    } else
      return (
        <div>
          <h1>Player Basic Info</h1>
          <div className='row'>
            <div className='col-sm-7'>
              <form>
                <div className={validation.name.isInvalid && 'has-error'}>
                  {/* <label htmlFor="name">Name</label>
                    <input type="text" className="form-control"
                    name="name"
                    placeholder="player name"
                    onChange={this.handleInputChange}
                    value={this.state.playerData.name}
                    /> */}
                  <TextField
                    required
                    error={validation.name.message}
                    id='name'
                    name='name'
                    label='First name'
                    defaultValue={this.state.playerData.name}
                    className={classes.textField}
                    margin='normal'
                    onChange={this.handleInputChange}
                  />
                  <FormHelperText>Required</FormHelperText>
                  {/* <span className="help-block">{validation.name.message}</span> */}
                </div>

                <div className={validation.surname.isInvalid && 'has-error'}>
                  {/* <label htmlFor="surname">Surname</label>
                    <input type="text" className="form-control"
                    name="surname"
                    placeholder="player surname"
                    onChange={this.handleInputChange}
                    value={this.state.playerData.surname}
                    /> */}
                  <TextField
                    id='surname'
                    name='surname'
                    label='Last name'
                    defaultValue={this.state.playerData.surname}
                    className={classes.textField}
                    margin='normal'
                    onChange={this.handleInputChange}
                  />
                  <span className='help-block'>
                    {validation.surname.message}
                  </span>
                </div>
                {/* <div>
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
                </div> */}
                <div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      margin='normal'
                      name='birthDate'
                      format='dd/MM/yyyy'
                      label='Date of birth'
                      value={this.state.playerData.birthDate}
                      onChange={this.handleBirthDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div>
                  <TextField
                    id='birthPlace'
                    label='Place of birth'
                    name='birthPlace'
                    defaultValue={this.state.playerData.birthPlace}
                    className={classes.textField}
                    margin='normal'
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <FormControl required className={classes.formControl}>
                    <InputLabel htmlFor='position'>Position</InputLabel>
                    <Select
                      value={this.state.playerData.position}
                      onChange={this.handleInputChange}
                      name='position'
                      inputProps={{
                        id: 'position-required',
                      }}
                      className={classes.selectEmpty}
                    >
                      {positions.map((position, index) => (
                        <MenuItem value={position} key={index}>
                          {position}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                </div>
              </form>
            </div>
            <div className='col-sm-5 text-center'>
              <img
                className='roundedImage'
                src={this.props.playerData.picture.url}
                height='100'
                width='100'
                alt=''
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

export default editModal(EditPlayerInfo);
