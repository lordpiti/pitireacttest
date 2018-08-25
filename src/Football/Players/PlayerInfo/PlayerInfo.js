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
      validation: this.validator.valid(),
      currentImage: null
    };

    Object.assign(newone, props.playerData);
    this.state = newone;

    this.submitted = false;
  }

  callbackDropzone = (files) => {
    console.log(this);
    let fileToUpload = null;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        // do whatever you want with the file content
        fileToUpload = reader.result;
        console.log(this);
        debugger;
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
    console.log(this);
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      // handle actual form submission here
      if (this.state.currentImage) {
        apiInstance.post('GlobalMedia/UploadBase64Image',
          { Base64String: this.state.currentImage.data, FileName: this.state.currentImage.fileName })
          .then(response => {

            this.setState({
              picture: response.data
            });

            apiInstance.post('player/savePlayerDetails', this.state)
              .then(response2 => {
                console.log(response2);
              })
          })
      }
    }
    else {
      apiInstance.post('player/savePlayerDetails', this.state)
        .then(response => {
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
        <div className="row">
          <div className="col-sm-9">
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
          <div className="col-sm-3">
            <img src={this.state.picture.url} height="100" width="100" />
            <BasicDropzone settings={this.dropzoneSettings} />
          </div>
        </div>
      </div>
    );
  }
};

export default PlayerInfo;