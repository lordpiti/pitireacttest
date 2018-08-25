import React, { Component } from 'react';
import BasicDropzone from '../../components/BasicDropzone/BasicDropzone';
import apiInstance from '../../utilities/axios-test';
import FormValidator from '../../utilities/FormValidator';

class PlayerInfo extends Component {

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
    
    let newone = {
      validation: this.validator.valid()
    };

    Object.assign(newone, props.playerData);
    this.state = newone;

    this.submitted = false;
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)

  submitImage(image, fileName) {
    apiInstance.post('GlobalMedia/UploadBase64Image',
      { Base64String: image, FileName: fileName })
      .then(response => {
        this.props.playerData.picture = response.data;
        apiInstance.post('player/savePlayerDetails',
          this.props.playerData)
          .then(response2 => {
            console.log(response2);
          })
      })
  }

  callbackDropzone(files) {
    let fileToUpload = null;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        // do whatever you want with the file content
        fileToUpload = reader.result;
        this.submitImage(fileToUpload, 'test.png');
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
      // handle actual form submission here
      apiInstance.post('player/savePlayerDetails', this.state).then(response => {
        debugger;
      });
    }
  }

  render() {

    let validation = this.submitted ?         // if the form has been submitted at least once
      this.validator.validate(this.state) :   // then check validity every time we render
      this.state.validation                   // otherwise just use what's in state

    return (
      <div>
        <h1>Player Basic Info</h1>
        <img src={this.props.playerData.picture.url} height="20" width="20" />

        <BasicDropzone settings={this.dropzoneSettings} />
        <form className="demoForm">

          <div className={validation.name.isInvalid && 'has-error'}>
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control"
              name="name"
              placeholder="player name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            <span className="help-block">{validation.name.message}</span>
          </div>

          <div className={validation.surname.isInvalid && 'has-error'}>
            <label htmlFor="surname">Surname</label>
            <input type="text" className="form-control"
              name="surname"
              placeholder="player surname"
              onChange={this.handleInputChange}
              value={this.state.surname}
            />
            <span className="help-block">{validation.surname.message}</span>
          </div>

          <button onClick={this.handleFormSubmit} className="btn btn-primary">
            Save
        </button>
        </form>
      </div>
    );
  }
};

export default PlayerInfo;